import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  GET_FEATURED_REQUEST,
  GET_FEATURED_SUCCESS,
  GET_FEATURED_FAIL,
  CLEAR_ERRORS,
  GET_ALL_PRODUCT_CATEGORIES_REQUEST,
  GET_ALL_PRODUCT_CATEGORIES_SUCCESS,
  GET_ALL_PRODUCT_CATEGORIES_FAIL,
} from "../constants/productConstants";

export const productsReducer = (
  state = {
    products: [],
  },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        count: action.payload.count,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const featuredReducer = (state = { featured: [] }, action) => {
  switch (action.type) {
    case GET_FEATURED_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_FEATURED_SUCCESS:
      return {
        loading: false,
        featured: action.payload,
      };

    case GET_FEATURED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productCategoriesReducer = (
  state = { categories: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_PRODUCT_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };

    case GET_ALL_PRODUCT_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
