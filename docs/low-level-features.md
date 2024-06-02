# Low-Level Technical Details of Octopus

## Authentication and User Management
- Simple pin-based authentication stored in Postgres
- Role-based access control for admin and non-admin users

## Daily Cash Flow Management
- Initial and end-of-day cash counts stored in Postgres
- Disbursements and reimbursements logged as JSON or related tables
- API endpoints for recording and retrieving cash flow data

## Employee Time Tracking
- Clock-in and clock-out times stored in Postgres
- API endpoints for recording and retrieving time card data

## Vacation Requests
- Vacation request data stored in Postgres
- Admin interface for approving/rejecting requests
- API endpoints for managing vacation requests

## Battery Product Management
- Battery details and status stored in Postgres
- API endpoints for managing battery records and statuses
- Notification system for updating customers

## User Account Management
- User account details stored in Postgres
- API endpoints for managing user accounts
- Interface for users to update their pin and phone number

## Notifications
- System for sending notifications to admin users
- API endpoints for notification management
