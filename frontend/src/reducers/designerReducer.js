import {ALL_DESIGNER_FAIL,
    ALL_DESIGNER_REQUEST,
    ALL_DESIGNER_SUCCESS,
    DESIGNER_DETAILS_REQUEST,
    DESIGNER_DETAILS_SUCCESS,
    DESIGNER_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL, 
    DESIGNER_LOGIN_REQUEST,
    DESIGNER_LOGIN_SUCCESS,
    DESIGNER_LOGIN_FAIL,
    REGISTER_DESIGNER_REQUEST,
    REGISTER_DESIGNER_SUCCESS,
    REGISTER_DESIGNER_FAIL,
    // LOAD_DESIGNER_REQUEST,
    // LOAD_DESIGNER_SUCCESS,
    // LOAD_DESIGNER_FAIL,
    // LOGOUT_SUCCESS,
    // LOGOUT_FAIL,
    CLEAR_ERRORS
} from "../constants/designerConstants";

export const designerReducer = (state = { designers : [] }, action) => {
    
    switch (action.type) {
        case ALL_DESIGNER_REQUEST:
            return {
                loading: true,
                designers: []
            }

            case ALL_DESIGNER_SUCCESS:
            return {
                loading: false,
                designers: action.payload.designers,
                designerCount: action.payload.designerCount,
                resultPerPage: action.payload.resultPerPage,
                filteredDesignersCount: action.payload.filteredDesignersCount,
            }


            case ALL_DESIGNER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

            case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
    
        default:
            return state;
    }
};



//get Designer Details
export const designerDetailsReducer = (state = { designer : {} }, action) => {
    
    switch (action.type) {
        case DESIGNER_DETAILS_REQUEST:
            
            return {
                loading: true,
                ...state,
            };

            case DESIGNER_DETAILS_SUCCESS:
            return {
                loading: false,
                designer: action.payload,
            };

            case DESIGNER_DETAILS_FAIL:
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


// create new review
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
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


  //LOGIN AND REGISTER
  export const loginReducer = (state = {designer:{} }, action) => {
    switch (action.type) {
      case DESIGNER_LOGIN_REQUEST:
        case REGISTER_DESIGNER_REQUEST:
          // case LOAD_DESIGNER_REQUEST:
        return {
          loading:true,
          isAuthenticated: false,
        };

        case DESIGNER_LOGIN_SUCCESS:
          case REGISTER_DESIGNER_SUCCESS:
            // case LOAD_DESIGNER_SUCCESS:
          return {
            ...state,
            loading: false,
            isAuthenticated: true,
            designer: action.payload,
          };

          // case LOAD_DESIGNER_FAIL:
          //   return {
          //     loading: false,
          //     isAuthenticated: false,
          //     designer:null,
          //     error: action.payload,
          //   };

            // case LOGOUT_SUCCESS:
            //   return{
            //     loading:false,
            //     designer:null,
            //     isAuthenticated: false,
            //   };

          case DESIGNER_LOGIN_FAIL:
            case REGISTER_DESIGNER_FAIL:
          return {
            ...state,
            loading: false,
            isAuthenticated: false,
            designer: null,
            error: action.payload,
          };

          // case LOGOUT_FAIL:
          //   return {
          //     ...state,
          //     loading: false,
          //     error: action.payload,
          //   };

          case CLEAR_ERRORS:
          return {
              ...state,
              error: null,
          };
    
      default:
        return state;
    }
  }


  //Register Designer
