package entity;

import org.json.JSONObject;

/**
 * 
 * @author Kira This class is the entity model modeling the schema of robot
 */
public class Robot {
	private String robotId;
	private String type;
	private String status;
	private String trackingNumber;
	private String dispatcher;

	private Robot(RobotBuilder builder) {
		this.robotId = builder.robotId;
		this.type = builder.type;
		this.status = builder.status;
		this.trackingNumber = builder.trackingNumber;
		this.dispatcher = builder.dispatcher;
	}
	
	public String getRobotId() {
		return robotId;
	}

	public String getType() {
		return type;
	}

	public String getStatus() {
		return status;
	}

	public String getTrackingNumber() {
		return trackingNumber;
	}
	
	public String getDispatcher() {
		return dispatcher;
	}
	
	public JSONObject toJSONObject() {
		JSONObject object = new JSONObject();
		object.put("robot_id", this.robotId);
		object.put("type", this.type);
		object.put("status", this.status);
		object.put("tracking_number", this.trackingNumber);
		return object;
	}

	public static class RobotBuilder {
		private String robotId;
		private String type;
		private String status;
		private String trackingNumber;
		private String dispatcher;

		public RobotBuilder setRobotId(String robotId) {
			this.robotId = robotId;
			return this;
		}

		public RobotBuilder setType(String type) {
			this.type = type;
			return this;
		}

		public RobotBuilder setStatus(String status) {
			this.status = status;
			return this;
		}

		public RobotBuilder setTrackingNumber(String trackingNumber) {
			this.trackingNumber = trackingNumber;
			return this;
		}
		
		public RobotBuilder setDispatcher(String dispatcher) {
			this.dispatcher = dispatcher;
			return this;
		}
		
		public Robot build() {
			return new Robot(this);
		}
	}
}
