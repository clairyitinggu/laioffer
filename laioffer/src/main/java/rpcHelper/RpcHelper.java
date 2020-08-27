package rpcHelper;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
/**
 * 
 * @author Kira
 * This class contains helper function to parse between json objects, json array and model objects
 */
public class RpcHelper {
	/**
	 * Writing json array into response bode
	 * @param response - http response object
	 * @param array - json array will be written into response body
	 * @throws IOException
	 */
	public static void writeJsonArray(HttpServletResponse response, JSONArray array) throws IOException {
		response.setContentType("application/json");
		response.getWriter().print(array);
	}

	/**
	 * 
	 * @param response - http response object
	 * @param object - json object will be written into response body
	 * @throws IOException
	 */
	public static void writeJsonObject(HttpServletResponse response, JSONObject object) throws IOException {
		response.setContentType("application/json");
		response.getWriter().print(object);
	}	
}
