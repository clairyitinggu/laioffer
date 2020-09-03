export default (state = {
  senderName: '', dispatcher: null, senderPhone: '', render: false, senderAddress: '', senderZip: '', 
  receiverName: '', receiverPhone: '', receiverAddress: '', receiverZip: '', shippingMethod: null, orderID: '',
}, action) => {
  switch (action.type) {
    case 'SET_SENDER_NAME':
      return { ...state, senderName: action.payload };
    case 'SET_DISPATCHER':
      return { ...state, dispatcher: action.payload };
    case 'SET_SENDER_PHONE':
      return { ...state, senderPhone: action.payload };
    case 'SET_CONDITIONAL_RENDER':
      return { ...state, render: action.payload };
    case 'SET_SENDER_ADDRESS':
      return { ...state, senderAddress: action.payload };
    case 'SET_SENDER_ZIP':
      return { ...state, senderZip: action.payload};

    case 'SET_RECEIVER_NAME':
      return { ...state, receiverName: action.payload };
    case 'SET_RECEIVER_PHONE':
      return { ...state, receiverPhone: action.payload };
    case 'SET_RECEIVER_ADDRESS':
      return { ...state, receiverAddress: action.payload };
    case 'SET_RECEIVER_ZIP':
      return { ...state, receiverZip: action.payload};

    case 'SET_SHIPPING_METHOD':
      return { ...state, shippingMethod: action.payload }

    case 'SET_ORDER_ID':
      return { ...state, orderID: action.payload }

    default:
      return state;
  }
};
