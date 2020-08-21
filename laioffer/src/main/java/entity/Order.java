package entity;

import org.json.JSONObject;

/**
 * 
 * @author Kira
 * This class is the entity model modeling the schema of Order
 */
public class Order {
	private String username;
	private String trackingNumber;
	private String start;
	private String destination;
	private String status;
	private String robot_id;

	
	private Order(OrderBuilder build) {
		this.username = build.username;
		this.trackingNumber = build.trackingNumber;
		this.start = build.start;
		this.destination = build.destination;
		this.status = build.status;
		this.robot_id = build.robot_id;
	}

	public String getUsername() {
		return username;
	}

	public String getTrackingNumber() {
		return trackingNumber;
	}

	public String getStart() {
		return start;
	}

	public String getDestination() {
		return destination;
	}

	public String getStatus() {
		return status;
	}

	public String getRobotId() {
		return robot_id;
	}

	public JSONObject toJSONObject() {
		JSONObject object = new JSONObject();
		object.put("username", this.username);
		object.put("tracking_number", this.trackingNumber);
		object.put("start", this.start);
		object.put("destination", this.destination);
		object.put("status", this.status);
		object.put("robot_id", this.robot_id);
		return object;
	}

	public static class OrderBuilder {
		private String username;
		private String trackingNumber;
		private String start;
		private String destination;
		private String status;
		private String robot_id;

		public OrderBuilder setUsername(String username) {
			this.username = username;
			return this;
		}

		public OrderBuilder setTrackingNumber(String trackingNumber) {
			this.trackingNumber = trackingNumber;
			return this;
		}

		public OrderBuilder setStart(String start) {
			this.start = start;
			return this;
		}

		public OrderBuilder setDestination(String destination) {
			this.destination = destination;
			return this;
		}

		public OrderBuilder setStatus(String status) {
			this.status = status;
			return this;
		}

		public OrderBuilder setRobotId(String robot_id) {
			this.robot_id = robot_id;
			return this;
		}
		
		public Order build() {
			return new Order(this);
		}
	}
}
