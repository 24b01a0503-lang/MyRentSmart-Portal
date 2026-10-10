package com.rentsmart.backend.dto;

public class DashboardResponse {

    private long totalUsers;
    private long totalProperties;
    private long totalBookings;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalUsers, long totalProperties, long totalBookings) {
        this.totalUsers = totalUsers;
        this.totalProperties = totalProperties;
        this.totalBookings = totalBookings;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalProperties() {
        return totalProperties;
    }

    public void setTotalProperties(long totalProperties) {
        this.totalProperties = totalProperties;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }
}