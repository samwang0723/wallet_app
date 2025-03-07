/* eslint-disable  @typescript-eslint/no-require-imports */
import debounce from 'lodash.debounce';
import React, {
  forwardRef,
  useMemo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  ImageStyle,
} from 'react-native';
import Qs from 'qs';
import { v4 as uuidv4 } from 'uuid';

const images = {
  poweredByGoogleImage: require('@assets/edd/powered_by_google.png'),
};

interface CustomTextInputProps extends TextInputProps {
  InputComp?: typeof TextInput;
}

interface DescriptionRow {
  description?: string;
  formatted_address?: string;
  name?: string;
  isLoading?: boolean;
  isPredefinedPlace?: boolean;
  isCurrentLocation?: boolean;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id?: string;
  types?: string[];
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
}

interface RequestUrlType {
  url: string;
  useOnPlatform: 'web' | 'all';
  headers?: Record<string, string>;
}

interface PlacePrediction {
  text?: {
    text: string;
  };
  placeId: string;
  structuredFormat?: {
    mainText?: {
      text: string;
    };
    secondaryText?: {
      text: string;
    };
  };
  types?: string[];
}

interface GooglePlacesSuggestion {
  placePrediction: PlacePrediction;
}

interface GooglePlacesResponse extends Partial<DescriptionRow> {
  status?: string;
  predictions?: DescriptionRow[];
  results?: DescriptionRow[];
  result?: DescriptionRow;
  error_message?: string;
  id?: string;
  suggestions?: GooglePlacesSuggestion[];
}

interface GooglePlacesDetailsQuery {
  fields?: string[];
  language?: string;
  region?: string;
  sessiontoken?: string;
}

interface GooglePlacesSearchQuery {
  rankby?: 'distance' | 'prominence';
  type?: string;
  radius?: number;
  language?: string;
  components?: string;
  strictbounds?: boolean;
  location?: string;
}

interface GoogleReverseGeocodingQuery {
  language?: string;
  result_type?: string[];
  location_type?: string[];
}

interface GooglePlacesAutocompleteProps {
  autoFillOnNotFound?: boolean;
  currentLocation?: boolean;
  currentLocationLabel?: string;
  debounce?: number;
  disableScroll?: boolean;
  enableHighAccuracyLocation?: boolean;
  enablePoweredByContainer?: boolean;
  fetchDetails?: boolean;
  filterReverseGeocodingByTypes?: string[];
  GooglePlacesDetailsQuery?: GooglePlacesDetailsQuery;
  GooglePlacesSearchQuery?: GooglePlacesSearchQuery;
  GoogleReverseGeocodingQuery?: GoogleReverseGeocodingQuery;
  inbetweenCompo?: React.ReactNode;
  isRowScrollable?: boolean;
  keyboardShouldPersistTaps?: 'never' | 'always' | 'handled';
  listEmptyComponent?: React.ReactElement;
  listLoaderComponent?: React.ReactElement;
  listHoverColor?: string;
  listUnderlayColor?: string;
  listViewDisplayed?: boolean | 'auto';
  keepResultsAfterBlur?: boolean;
  minLength?: number;
  nearbyPlacesAPI?: string;
  numberOfLines?: number;
  onFail?: (error: string) => void;
  onNotFound?: (results: GooglePlacesResponse) => void;
  onPress?: (data: DescriptionRow, details?: DescriptionRow) => void;
  onTimeout?: () => void;
  placeholder?: string;
  predefinedPlaces?: DescriptionRow[];
  predefinedPlacesAlwaysVisible?: boolean;
  preProcess?: (text: string) => string;
  query?: {
    key: string;
    language: string;
    types?: string;
    components?: string;
    locationbias?: string;
    [key: string]: string | undefined;
  };
  renderDescription?: (row: DescriptionRow) => string;
  renderHeaderComponent?: (text: string) => React.ReactElement;
  renderLeftButton?: () => React.ReactElement;
  renderRightButton?: () => React.ReactElement;
  renderRow?: (rowData: DescriptionRow, index: number) => React.ReactElement;
  requestUrl?: RequestUrlType;
  styles?: {
    container?: StyleProp<ViewStyle>;
    textInputContainer?: StyleProp<ViewStyle>;
    textInput?: StyleProp<TextStyle>;
    listView?: StyleProp<ViewStyle>;
    row?: StyleProp<ViewStyle>;
    loader?: StyleProp<ViewStyle>;
    description?: StyleProp<TextStyle>;
    separator?: StyleProp<ViewStyle>;
    poweredContainer?: StyleProp<ViewStyle>;
    powered?: StyleProp<ImageStyle>;
    predefinedPlacesDescription?: StyleProp<TextStyle>;
    specialItemRow?: StyleProp<ViewStyle>;
  };
  suppressDefaultStyles?: boolean;
  textInputHide?: boolean;
  textInputProps?: CustomTextInputProps;
  timeout?: number;
  isNewPlacesAPI?: boolean;
  fields?: string;
  children?: React.ReactNode;
}

interface GooglePlacesAutocompleteRef {
  setAddressText: (address: string) => void;
  getAddressText: () => string;
  blur: () => void;
  focus: () => void;
  isFocused: () => boolean;
  clear: () => void;
  getCurrentLocation: () => void;
}

const defaultStyles = {
  container: {
    flex: 1,
  } as ViewStyle,
  textInputContainer: {
    flexDirection: 'row' as const,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    marginBottom: 5,
  } as TextStyle,
  listView: {} as ViewStyle,
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    minHeight: 44,
    flexDirection: 'row' as const,
  } as ViewStyle,
  loader: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-end',
    height: 20,
  } as ViewStyle,
  description: {} as TextStyle,
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c8c7cc',
  } as ViewStyle,
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  } as ViewStyle,
  powered: {
    width: 108,
    height: 14,
  } as ImageStyle,
};

export const GooglePlacesAutocomplete = forwardRef<
  GooglePlacesAutocompleteRef,
  GooglePlacesAutocompleteProps
>((props, ref) => {
  let _results: DescriptionRow[] = [];
  let _requests: XMLHttpRequest[] = [];

  const getRequestUrl = useCallback((requestUrl?: RequestUrlType): string => {
    if (requestUrl) {
      if (requestUrl.useOnPlatform === 'all') {
        return requestUrl.url;
      }
      if (requestUrl.useOnPlatform === 'web') {
        return Platform.select({
          web: requestUrl.url,
          default: 'https://maps.googleapis.com/maps/api',
        });
      }
    }
    return 'https://maps.googleapis.com/maps/api';
  }, []);

  const [stateText, setStateText] = useState<string>('');
  const [dataSource, setDataSource] = useState<DescriptionRow[]>([]);
  const [listViewDisplayed, setListViewDisplayed] = useState<boolean>(
    props.listViewDisplayed === 'auto' ? false : !!props.listViewDisplayed
  );
  const [url, setUrl] = useState<string>(getRequestUrl(props.requestUrl));
  const [listLoaderDisplayed, setListLoaderDisplayed] =
    useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string>(uuidv4());

  const inputRef = useRef<TextInput>(null);

  const hasNavigator = (): boolean => {
    if (navigator?.geolocation) {
      return true;
    }
    console.warn(
      'If you are using React Native v0.60.0+ you must follow these instructions to enable currentLocation: https://git.io/Jf4AR'
    );
    return false;
  };

  const buildRowsFromResults = useCallback(
    (results: DescriptionRow[], text?: string): DescriptionRow[] => {
      let res: DescriptionRow[] = [];
      const shouldDisplayPredefinedPlaces = text
        ? results.length === 0 && text.length === 0
        : results.length === 0;

      if (
        shouldDisplayPredefinedPlaces ||
        props.predefinedPlacesAlwaysVisible === true
      ) {
        res = [
          ...(props.predefinedPlaces?.filter(
            (place) => place?.description?.length
          ) || []),
        ];

        if (props.currentLocation === true && hasNavigator()) {
          res.unshift({
            description: props.currentLocationLabel,
            isCurrentLocation: true,
          });
        }
      }

      res = res.map((place) => ({
        ...place,
        isPredefinedPlace: true,
      }));

      return [...res, ...results];
    },
    [
      props.currentLocation,
      props.currentLocationLabel,
      props.predefinedPlaces,
      props.predefinedPlacesAlwaysVisible,
    ]
  );

  const getRequestHeaders = (
    requestUrl?: RequestUrlType
  ): Record<string, string> => {
    return requestUrl?.headers || {};
  };

  const setRequestHeaders = (
    request: XMLHttpRequest,
    headers: Record<string, string>
  ): void => {
    Object.keys(headers).forEach((headerKey) =>
      request.setRequestHeader(headerKey, headers[headerKey])
    );
  };

  useEffect(() => {
    setUrl(getRequestUrl(props.requestUrl));
  }, [getRequestUrl, props.requestUrl]);

  useEffect(() => {
    _handleChangeText(stateText);
    return () => {
      _abortRequests();
    };
  }, [props.query]);

  useEffect(() => {
    setDataSource(buildRowsFromResults([]));
  }, [buildRowsFromResults, props.predefinedPlaces]);

  useImperativeHandle(ref, () => ({
    setAddressText: (address: string) => {
      setStateText(address);
    },
    getAddressText: () => stateText,
    blur: () => inputRef.current?.blur(),
    focus: () => inputRef.current?.focus(),
    isFocused: () => inputRef.current?.isFocused() || false,
    clear: () => inputRef.current?.clear(),
    getCurrentLocation,
  }));

  const requestShouldUseWithCredentials = (): boolean =>
    url === 'https://maps.googleapis.com/maps/api';

  const _abortRequests = (): void => {
    _requests.forEach((request) => {
      request.onreadystatechange = null;
      request.abort();
    });
    _requests = [];
  };

  const supportedPlatform = (): boolean => {
    if (Platform.OS === 'web' && !props.requestUrl) {
      console.warn(
        'This library cannot be used for the web unless you specify the requestUrl prop. See https://git.io/JflFv for more for details.'
      );
      return false;
    }
    return true;
  };

  const getCurrentLocation = (): void => {
    let options: GeolocationOptions = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    };

    if (props.enableHighAccuracyLocation && Platform.OS === 'android') {
      options = {
        enableHighAccuracy: true,
        timeout: 20000,
      };
    }

    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          if (props.nearbyPlacesAPI === 'None') {
            const currentLocation: DescriptionRow = {
              description: props.currentLocationLabel,
              geometry: {
                location: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              },
            };

            _disableRowLoaders();
            props.onPress?.(currentLocation, currentLocation);
          } else {
            _requestNearby(position.coords.latitude, position.coords.longitude);
          }
        },
        (error: GeolocationPositionError) => {
          _disableRowLoaders();
          console.error(error.message);
        },
        options
      );
    }
  };

  const _enableRowLoader = (rowData: DescriptionRow): void => {
    const rows = buildRowsFromResults(_results);
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].place_id === rowData.place_id ||
        (rows[i].isCurrentLocation === true &&
          rowData.isCurrentLocation === true)
      ) {
        rows[i].isLoading = true;
        setDataSource(rows);
        break;
      }
    }
  };

  const _disableRowLoaders = (): void => {
    _results.forEach((result) => {
      if (result.isLoading === true) {
        result.isLoading = false;
      }
    });
    setDataSource(buildRowsFromResults(_results));
  };

  const _getPredefinedPlace = (rowData: DescriptionRow): DescriptionRow => {
    if (rowData.isPredefinedPlace !== true) {
      return rowData;
    }

    const predefinedPlace = props.predefinedPlaces?.find(
      (place) => place.description === rowData.description
    );

    return predefinedPlace || rowData;
  };

  const _filterResultsByTypes = (
    unfilteredResults: DescriptionRow[],
    types: string[]
  ): DescriptionRow[] => {
    if (types.length === 0) return unfilteredResults;

    return unfilteredResults.filter((result) =>
      result.types?.some((type) => types.includes(type))
    );
  };

  const _filterResultsByPlacePredictions = (
    unfilteredResults: GooglePlacesSuggestion[]
  ): DescriptionRow[] => {
    return unfilteredResults
      .filter((result) => result.placePrediction)
      .map((result) => ({
        description: result.placePrediction.text?.text,
        place_id: result.placePrediction.placeId,
        reference: result.placePrediction.placeId,
        structured_formatting: {
          main_text: result.placePrediction.structuredFormat?.mainText?.text,
          secondary_text:
            result.placePrediction.structuredFormat?.secondaryText?.text,
        },
        types: result.placePrediction.types || [],
      }));
  };

  const _requestNearby = (latitude: number, longitude: number): void => {
    _abortRequests();

    if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude !== null &&
      longitude !== null
    ) {
      const request = new XMLHttpRequest();
      _requests.push(request);
      if (props.timeout) {
        request.timeout = props.timeout;
      }
      if (props.onTimeout) {
        request.ontimeout = () => props.onTimeout?.();
      }
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          setListLoaderDisplayed(true);
          return;
        }

        setListLoaderDisplayed(false);
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          _disableRowLoaders();

          if (responseJSON.results !== undefined) {
            const results =
              props.nearbyPlacesAPI === 'GoogleReverseGeocoding'
                ? _filterResultsByTypes(
                    responseJSON.results,
                    props.filterReverseGeocodingByTypes || []
                  )
                : responseJSON.results;

            setDataSource(buildRowsFromResults(results));
          }
          if (responseJSON.error_message !== undefined) {
            if (!props.onFail) {
              console.warn(
                'google places autocomplete: ' + responseJSON.error_message
              );
            } else {
              props.onFail(responseJSON.error_message);
            }
          }
        }
      };

      const requestUrl =
        props.nearbyPlacesAPI === 'GoogleReverseGeocoding'
          ? `${url}/geocode/json?${Qs.stringify({
              latlng: `${latitude},${longitude}`,
              key: props.query?.key,
              ...props.GoogleReverseGeocodingQuery,
            })}`
          : `${url}/place/nearbysearch/json?${Qs.stringify({
              location: `${latitude},${longitude}`,
              key: props.query?.key,
              ...props.GooglePlacesSearchQuery,
            })}`;

      request.open('GET', requestUrl);
      request.withCredentials = requestShouldUseWithCredentials();
      setRequestHeaders(request, getRequestHeaders(props.requestUrl));
      request.send();
    } else {
      _results = [];
      setDataSource(buildRowsFromResults([]));
    }
  };

  const _request = (text: string): void => {
    _abortRequests();
    if (!url) {
      return;
    }
    if (supportedPlatform() && text && text.length >= (props.minLength || 0)) {
      const request = new XMLHttpRequest();
      _requests.push(request);
      if (props.timeout) {
        request.timeout = props.timeout;
      }
      if (props.onTimeout) {
        request.ontimeout = () => props.onTimeout?.();
      }
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          setListLoaderDisplayed(true);
          return;
        }

        setListLoaderDisplayed(false);
        if (request.status === 200) {
          const response: GooglePlacesResponse = JSON.parse(
            request.responseText
          );

          if (response.predictions !== undefined) {
            const results =
              props.nearbyPlacesAPI === 'GoogleReverseGeocoding'
                ? _filterResultsByTypes(
                    response.predictions,
                    props.filterReverseGeocodingByTypes || []
                  )
                : response.predictions;

            _results = results;
            setDataSource(buildRowsFromResults(results, text));
          }
          if (response.suggestions !== undefined) {
            const results = _filterResultsByPlacePredictions(
              response.suggestions
            );

            _results = results;
            setDataSource(buildRowsFromResults(results, text));
          }
          if (response.error_message !== undefined) {
            if (!props.onFail) {
              console.warn(
                'google places autocomplete: ' + response.error_message
              );
            } else {
              props.onFail(response.error_message);
            }
          }
        }
      };

      if (props.preProcess) {
        setStateText(props.preProcess(text));
      }

      if (props.isNewPlacesAPI) {
        const { key, locationbias, types, ...rest } = props.query || {};
        void [key, locationbias, types];

        request.open('POST', `${url}/v1/places:autocomplete`);
        request.send(
          JSON.stringify({
            input: text,
            sessionToken,
            ...rest,
          })
        );
      } else {
        request.open(
          'GET',
          `${url}/place/autocomplete/json?input=${encodeURIComponent(text)}&${Qs.stringify(
            props.query || {}
          )}`
        );
        request.send();
      }
    } else {
      _results = [];
      setDataSource(buildRowsFromResults([]));
    }
  };

  const debounceData = useMemo(
    () => debounce(_request, props.debounce || 0),
    [props.query, url]
  );

  const _onChangeText = (text: string): void => {
    setStateText(text);
    debounceData(text);
  };

  const _handleChangeText = (text: string): void => {
    _onChangeText(text);
    props.textInputProps?.onChangeText?.(text);
  };

  const _getRowLoader = (): React.ReactElement => {
    return <ActivityIndicator animating={true} size="small" />;
  };

  const _renderDescription = (rowData: DescriptionRow): string => {
    if (props.renderDescription) {
      return props.renderDescription(rowData);
    }
    return (
      rowData.description || rowData.formatted_address || rowData.name || ''
    );
  };

  const _renderRowData = (
    rowData: DescriptionRow,
    index: number
  ): React.ReactElement => {
    if (props.renderRow) {
      return props.renderRow(rowData, index);
    }

    return (
      <Text
        style={[
          props.suppressDefaultStyles ? {} : defaultStyles.description,
          props.styles?.description,
          rowData.isPredefinedPlace
            ? props.styles?.predefinedPlacesDescription
            : {},
        ]}
        numberOfLines={props.numberOfLines}
      >
        {_renderDescription(rowData)}
      </Text>
    );
  };

  const _renderLoader = (
    rowData: DescriptionRow
  ): React.ReactElement | null => {
    if (rowData.isLoading === true) {
      return (
        <View
          style={[
            props.suppressDefaultStyles ? {} : defaultStyles.loader,
            props.styles?.loader,
          ]}
        >
          {_getRowLoader()}
        </View>
      );
    }
    return null;
  };

  const _renderRow = (
    rowData: DescriptionRow,
    index: number
  ): React.ReactElement => {
    return (
      <ScrollView
        contentContainerStyle={
          props.isRowScrollable ? { minWidth: '100%' } : { width: '100%' }
        }
        scrollEnabled={props.isRowScrollable}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={({ pressed }) => [
            props.isRowScrollable ? { minWidth: '100%' } : { width: '100%' },
            {
              backgroundColor: pressed
                ? props.listUnderlayColor
                : props.listHoverColor,
            },
          ]}
          onPress={() => _onPress(rowData)}
          onBlur={_onBlur}
        >
          <View
            style={[
              props.suppressDefaultStyles ? {} : defaultStyles.row,
              props.styles?.row,
              rowData.isPredefinedPlace ? props.styles?.specialItemRow : {},
            ]}
          >
            {_renderLoader(rowData)}
            {_renderRowData(rowData, index)}
          </View>
        </Pressable>
      </ScrollView>
    );
  };

  const _renderSeparator = (
    sectionID: string | number,
    rowID: string | number
  ): React.ReactElement | null => {
    if (rowID === dataSource.length - 1) {
      return null;
    }

    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={[
          props.suppressDefaultStyles ? {} : defaultStyles.separator,
          props.styles?.separator,
        ]}
      />
    );
  };

  const _onBlur = (): void => {
    if (!props.keepResultsAfterBlur) {
      setListViewDisplayed(false);
    }
    inputRef.current?.blur();
  };

  const _onFocus = (): void => setListViewDisplayed(true);

  const _shouldShowPoweredLogo = (): boolean => {
    if (!props.enablePoweredByContainer || dataSource.length === 0) {
      return false;
    }

    return dataSource.some(
      (row) => !row.isCurrentLocation && !row.isPredefinedPlace
    );
  };

  const _renderPoweredLogo = (): React.ReactElement | null => {
    if (!_shouldShowPoweredLogo()) {
      return null;
    }

    return (
      <View
        style={[
          props.suppressDefaultStyles ? {} : defaultStyles.row,
          defaultStyles.poweredContainer,
          props.styles?.poweredContainer,
        ]}
      >
        <Image
          style={[
            props.suppressDefaultStyles ? {} : defaultStyles.powered,
            props.styles?.powered,
          ]}
          resizeMode="contain"
          source={images.poweredByGoogleImage}
        />
      </View>
    );
  };

  const _renderLeftButton = (): React.ReactElement | null => {
    return props.renderLeftButton?.() || null;
  };

  const _renderRightButton = (): React.ReactElement | null => {
    return props.renderRightButton?.() || null;
  };

  const _getFlatList = (): React.ReactElement | null => {
    const keyGenerator = () => Math.random().toString(36).substr(2, 10);

    if (
      supportedPlatform() &&
      (stateText !== '' ||
        (props.predefinedPlaces?.length || 0) > 0 ||
        props.currentLocation === true) &&
      listViewDisplayed === true
    ) {
      const ListEmptyComponent = listLoaderDisplayed
        ? props.listLoaderComponent
        : stateText.length > (props.minLength || 0)
          ? props.listEmptyComponent
          : null;

      return (
        <FlatList
          nativeID="result-list-id"
          scrollEnabled={!props.disableScroll}
          style={[
            props.suppressDefaultStyles ? {} : defaultStyles.listView,
            props.styles?.listView,
          ]}
          data={dataSource}
          keyExtractor={keyGenerator}
          extraData={[dataSource, props]}
          ItemSeparatorComponent={({ leadingItem, section }) =>
            _renderSeparator(section?.key || 0, dataSource.indexOf(leadingItem))
          }
          renderItem={({ item, index }) => _renderRow(item, index)}
          ListEmptyComponent={ListEmptyComponent}
          ListHeaderComponent={
            props.renderHeaderComponent &&
            props.renderHeaderComponent(stateText)
          }
          ListFooterComponent={_renderPoweredLogo}
          {...props}
        />
      );
    }

    return null;
  };

  const { onFocus, onBlur, clearButtonMode, InputComp, ...userProps } =
    props.textInputProps || {};

  const TextInputComp = InputComp || TextInput;

  const _onPress = (rowData: DescriptionRow): void => {
    if (rowData.isPredefinedPlace !== true && props.fetchDetails === true) {
      if (rowData.isLoading === true) {
        return;
      }

      Keyboard.dismiss();
      _abortRequests();
      _enableRowLoader(rowData);

      const request = new XMLHttpRequest();
      _requests.push(request);
      if (props.timeout) {
        request.timeout = props.timeout;
      }
      if (props.onTimeout) {
        request.ontimeout = () => props.onTimeout?.();
      }
      request.onreadystatechange = () => {
        if (request.readyState !== 4) return;

        if (request.status === 200) {
          const response: GooglePlacesResponse = JSON.parse(
            request.responseText
          );
          if (
            response.status === 'OK' ||
            (props.isNewPlacesAPI && response.id)
          ) {
            const details = props.isNewPlacesAPI ? response : response.result;
            if (details) {
              _disableRowLoaders();
              _onBlur();

              setStateText(_renderDescription(rowData));
              delete rowData.isLoading;
              props.onPress?.(rowData, details);
            }
          } else {
            _disableRowLoaders();

            if (props.autoFillOnNotFound) {
              setStateText(_renderDescription(rowData));
              delete rowData.isLoading;
            }

            if (!props.onNotFound) {
              console.warn('google places autocomplete: ' + response.status);
            } else {
              props.onNotFound(response);
            }
          }
        } else {
          _disableRowLoaders();
          props.onFail?.('request could not be completed or has been aborted');
        }
      };

      if (props.isNewPlacesAPI) {
        request.open(
          'GET',
          `${url}/v1/places/${rowData.place_id}?${Qs.stringify({
            key: props.query?.key,
            sessionToken,
            fields: props.fields,
          })}`
        );
        setSessionToken(uuidv4());
      } else {
        request.open(
          'GET',
          `${url}/place/details/json?${Qs.stringify({
            key: props.query?.key,
            placeid: rowData.place_id,
            language: props.query?.language,
            ...props.GooglePlacesDetailsQuery,
          })}`
        );
      }

      request.withCredentials = requestShouldUseWithCredentials();
      setRequestHeaders(request, getRequestHeaders(props.requestUrl));
      request.send();
    } else if (rowData.isCurrentLocation === true) {
      _enableRowLoader(rowData);
      setStateText(_renderDescription(rowData));
      delete rowData.isLoading;
      getCurrentLocation();
    } else {
      setStateText(_renderDescription(rowData));
      _onBlur();
      delete rowData.isLoading;
      const predefinedPlace = _getPredefinedPlace(rowData);
      props.onPress?.(predefinedPlace, predefinedPlace);
    }
  };

  return (
    <View
      style={[
        props.suppressDefaultStyles ? {} : defaultStyles.container,
        props.styles?.container,
      ]}
      pointerEvents="box-none"
    >
      {!props.textInputHide && (
        <View
          style={[
            props.suppressDefaultStyles ? {} : defaultStyles.textInputContainer,
            props.styles?.textInputContainer,
          ]}
        >
          {_renderLeftButton()}
          <TextInputComp
            ref={inputRef}
            style={[
              props.suppressDefaultStyles ? {} : defaultStyles.textInput,
              props.styles?.textInput,
            ]}
            value={stateText}
            placeholder={props.placeholder}
            onFocus={onFocus || _onFocus}
            onBlur={onBlur || _onBlur}
            clearButtonMode={clearButtonMode || 'while-editing'}
            onChangeText={_handleChangeText}
            {...userProps}
          />
          {_renderRightButton()}
        </View>
      )}
      {props.inbetweenCompo}
      {_getFlatList()}
      {props.children}
    </View>
  );
});

GooglePlacesAutocomplete.defaultProps = {
  autoFillOnNotFound: false,
  currentLocation: false,
  currentLocationLabel: 'Current location',
  debounce: 0,
  disableScroll: false,
  enableHighAccuracyLocation: true,
  enablePoweredByContainer: true,
  fetchDetails: false,
  filterReverseGeocodingByTypes: [],
  GooglePlacesDetailsQuery: {},
  GooglePlacesSearchQuery: {
    rankby: 'distance',
    type: 'restaurant',
  },
  GoogleReverseGeocodingQuery: {},
  isRowScrollable: true,
  keyboardShouldPersistTaps: 'always',
  listHoverColor: '#ececec',
  listUnderlayColor: '#c8c7cc',
  listViewDisplayed: 'auto',
  keepResultsAfterBlur: false,
  minLength: 0,
  nearbyPlacesAPI: 'GooglePlacesSearch',
  numberOfLines: 1,
  onFail: () => {},
  onNotFound: () => {},
  onPress: () => {},
  onTimeout: () => console.warn('google places autocomplete: request timeout'),
  placeholder: '',
  predefinedPlaces: [],
  predefinedPlacesAlwaysVisible: false,
  query: {
    key: 'missing api key',
    language: 'en',
    types: 'geocode',
  },
  styles: {},
  suppressDefaultStyles: false,
  textInputHide: false,
  textInputProps: {},
  timeout: 20000,
  isNewPlacesAPI: false,
  fields: '*',
} as GooglePlacesAutocompleteProps;

GooglePlacesAutocomplete.displayName = 'GooglePlacesAutocomplete';

export default { GooglePlacesAutocomplete };
