import java.util.*;
import com.paypal.api.payments.*;
import com.paypal.base.rest.*;

/**
 * Replace the values of CLIENT_ID and CLIENT_SECRET by the actual code of your PayPal sandbox app you’ve created.
 */
    public class PaymentServices {
        private static final String CLIENT_ID = "Your_PayPal_Client_ID";
        private static final String CLIENT_SECRET = "Your_PayPal_Client_Secret";
        private static final String MODE = "sandbox";

        public String authorizePayment(OrderInfo orderDetail)
                throws PayPalRESTException {

            Payer payer = getPayerInformation();
            RedirectUrls redirectUrls = getRedirectURLs();
            List<Transaction> listTransaction = getTransactionInformation(orderDetail);

            Payment requestPayment = new Payment();
            requestPayment.setTransactions(listTransaction);
            requestPayment.setRedirectUrls(redirectUrls);
            requestPayment.setPayer(payer);
            requestPayment.setIntent("authorize");

            APIContext apiContext = new APIContext(CLIENT_ID, CLIENT_SECRET, MODE);

            Payment approvedPayment = requestPayment.create(apiContext);

            return getApprovalLink(approvedPayment);

        }

    /**
     * Obtain information required by PayPal for verification
     * @return Payer information
     */
        private Payer getPayerInformation() {
            Payer payer = new Payer();
            payer.setPaymentMethod("paypal");

            PayerInfo payerInfo = new PayerInfo();
            payerInfo.setFirstName("William")
                    .setLastName("Peterson")
                    .setEmail("william.peterson@company.com");

            payer.setPayerInfo(payerInfo);

            return payer;
        }

        private RedirectUrls getRedirectURLs() {
            RedirectUrls redirectUrls = new RedirectUrls();
            redirectUrls.setCancelUrl("http://localhost:8080/PaypalTest/cancel.html");
            redirectUrls.setReturnUrl("http://localhost:8080/PaypalTest/review_payment");

            return redirectUrls;
        }

        private List<Transaction> getTransactionInformation(OrderInfo orderDetail) {
            Details details = new Details();
            details.setShipping(orderDetail.getShipping());
            details.setSubtotal(orderDetail.getSubtotal());
            details.setTax(orderDetail.getTax());

            Amount amount = new Amount();
            amount.setCurrency("USD");
            amount.setTotal(orderDetail.getTotal());
            amount.setDetails(details);

            Transaction transaction = new Transaction();
            transaction.setAmount(amount);
            transaction.setDescription(orderDetail.getProductName());

            ItemList itemList = new ItemList();
            List<Item> items = new ArrayList<Item>();

            Item item = new Item();
            item.setCurrency("USD");
            item.setName(orderDetail.getProductName());
            item.setPrice(orderDetail.getSubtotal());
            item.setTax(orderDetail.getTax());
            item.setQuantity("1");

            items.add(item);
            itemList.setItems(items);
            transaction.setItemList(itemList);

            List<Transaction> listTransaction = new ArrayList<Transaction>();
            listTransaction.add(transaction);

            return listTransaction;
        }

        private String getApprovalLink(Payment approvedPayment) {
            List<Links> links = approvedPayment.getLinks();
            String approval_Link = null;

            for (Links link : links) {
                if (link.getRel().equalsIgnoreCase("approval_url")) {
                    approval_Link = link.getHref();
                    break;
                }
            }

            return approval_Link;
        }

        public Payment getPaymentDetails(String paymentId) throws PayPalRESTException {
            APIContext apiContext = new APIContext(CLIENT_ID, CLIENT_SECRET, MODE);
            return Payment.get(apiContext, paymentId);
        }

    public Payment executePayment(String paymentId, String payerId)
            throws PayPalRESTException {
        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        Payment payment = new Payment().setId(paymentId);

        APIContext apiContext = new APIContext(CLIENT_ID, CLIENT_SECRET, MODE);

        return payment.execute(apiContext, paymentExecution);
    }
    }

