import { Booking } from "./booking.type";
import { Subscription } from "./subscription.type";
import { Vehicle } from "./vehicle.type";

export type Roles = "User" | "Admin";

export interface User {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: Date;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  businessCoordinatesString: string;
  businessName: string;
  firstName: string;
  lastName: string;
  userBookings: Booking[];
  userVehicles: Vehicle[];
  userSubscriptions: Subscription[];
}

export interface UserLoginResponse {
  message: string;
  token: string;

  email: string;
  id: string;
  roles: Roles[];
}

export type UserStats = {
  totalVehicles: number;
  totalActiveBookings: number;
  totalCompletedBookings: number;
};

export type PasswordUpdateParams = {
  userId: string;
  newPassword: string;
  currentPassword: string;
};
