export const BACKEND_BASE = 'http://localhost:8000';

export const AUTH_API = {
    LOGIN_API:BACKEND_BASE+'/auth/login',
    REFRESH_API:BACKEND_BASE+'/auth/refresh',
    VERIFY_API:BACKEND_BASE+'/auth/verify',
    SIGNIN_API:BACKEND_BASE+'/auth/signin',
}

export const CHAT_API = {
    CHAT_INIT_API:BACKEND_BASE+'/chat/init',
    CHAT_FETCH_CONVERSATION_API:BACKEND_BASE+'/chat/conversations',
    CHAT_FETCH_CHATMETADATA_API:BACKEND_BASE+'/chat/fetch/store',
    SAVE_CHAT_MESSAGE:BACKEND_BASE+'/chat/save/message',
}

export const ECOMM_API = {
    NAV_SEARCH_STORE:BACKEND_BASE+'/ecomm/store',
    STORE_PRODUCT_UPLOAD:BACKEND_BASE+'/ecomm/product/upload',
    STORE_PRODUCT_FETCH:BACKEND_BASE+'/ecomm/fetch/stock',
    STORE_PRODUCT_DELETE:BACKEND_BASE+'/ecomm/delete/stock',
    STORE_PRODUCT_UPDATE:BACKEND_BASE+'/ecomm/update/stock',
    STORE_PRODUCT_ADD_TO_CART_API:BACKEND_BASE+'/ecomm/upload/cart/',
    STORE_PRODUCT_DELETE_FROM_CART_API:BACKEND_BASE+'/ecomm/delete/cart/',
    FETCH_STORE_USERID:BACKEND_BASE+'/ecomm/store/userid',
    FETCH_STORE_STORENAME:BACKEND_BASE+'/ecomm/fetch/stock/',
    FETCH_CART__API:BACKEND_BASE+'/ecomm/fetch/cart',
}

export const POST_API = {
    FETCH_POST: BACKEND_BASE+'/post/fetch/post',
    UPLOAD_POST:BACKEND_BASE+'/post/upload/post',
    DELETE_POST:BACKEND_BASE+'/post/delete/post',
    COMMENT_TOGGLELIKE:BACKEND_BASE+'/post/togglelike/comment',
    POST_TOGGLELIKE:BACKEND_BASE+'/post/togglelike/post',
    FETCH_COMMENT:BACKEND_BASE+'/post/fetch/comment',
    UPLOAD_COMMENT:BACKEND_BASE+'/post/upload/comment',
}

export const STRIPE_API = {
    STRIPE_PAYMENT_SESSION_API:BACKEND_BASE+'/stripe/create-checkout-session',
    STRIPE_CONNECTED_ACCOUNT:BACKEND_BASE+'/stripe/create-connected-account',
    STRIPE_CONTINUE_ONBOARDING:BACKEND_BASE+'/stripe/continue-onboarding-process',
    STRIPE_ACCOUNT_CHECK:BACKEND_BASE+'/stripe/user-account-check',
}

export const USER_PERSONALIZATION_API={
    FETCH_FOLLOWERS:BACKEND_BASE+'/user-personalization/followers',
    DEACTIVATE_USER:BACKEND_BASE+'/user-personalization/deactivate/user',
    UPDATE_USER:BACKEND_BASE+'/user-personalization/update/user',
    NAV_FOLLOW_STORE:BACKEND_BASE+'/user-personalization/follow/store',
    NAV_UNFOLLOW_STORE:BACKEND_BASE+'/user-personalization/unfollow/store',
}
