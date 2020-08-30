package robotManagement;

public class Point {
	private double lat;
	private double lng;

	public Point(double lat, double lng) {
		this.lat = lat;
		this.lng = lng;
	}

	public double getLat() {
		return lat;
	}

	public double getLng() {
		return lng;
	}
}
