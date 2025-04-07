export type Reservation = {
  id: Number,
  checkin_date: Date,
  checkout_date: Date,
  user_id: Number,
  room_id: Number,
  user: User,
  room: Room
}

export type User = {
  id: Number,
  user_name: String,
  user_email: String,
  user_phone: String,
  user_password?: String,
}

export type Room = {
  id: Number,
  hotel_name: String,
  city: String,
  room_number: String,
  price_per_day: Number
}
