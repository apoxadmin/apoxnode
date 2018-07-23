# APO-X node.js website
Hello friends! After what feels like a decade running our site on PHP, and then WordPress, we're updating our tech by starting work on a new site built on node.js. We would appreciate any help! Check out the projects board for this repository to see where we're going, which we'll start updating soon!
#Coming Soon!
So an important thing we need to include is demo databases that anyone can set up in order to model working with the old databases. Coming to a repository near you:
(possibly more columns and tables that I missed sorry)
### action
 * user_id, value, value2, value3
### bro
 * little, big
### chair
 * event_id, user_id
### class
 * class_id, class_name, class_nick, class_term, class_year, class_start, class_mascot, class_spokesperson
### event
 * event_item, event_name, event_date, event_enddate, eventtype_id, event_ic, event_fund, event_location, event_mileage, event_address, event_longitude, event_latitude, event_description, event_contact, event_custom1, event_custom2, event_custom3, event_custom4, event_custom5, event_hot, event_stamps, event_map
### eventcomment
 * eventcomment_id, event_id, user_id, comment, timeComment
### eventtype
 * eventtype_id, eventtype_name
### family
 * family_id, family_name
### fourc
 * event_id, fourc_c
### interest (maybe not used)
 * user_id, event_id
### requirements_tracking
 * name, strikes, dues, flyering, meetings, rushevents, leaderships, committee, fellowships, service, fundraisers, ics, famevents, famcomps, pasocials, miles, points, events
### req_tracking backup
### shift
 * shift_id, event_id, shift_name, shift_start, shift_end, shift_capacity
### shirt
 * shirt_id, shirt_size
### signup
 * user_id, shift_id, signup_order, signup_driving, signup_chair, signup_camera, signup_ride, wants_replacement, replacing, requested_since, signup_custom1, signup_custom2, signup_custom3, signup_custom4, signup_custom5, signup_time
### status
 * status_id, status_name
### style (idk what this does)
 * style_id, style_name, style_file
### tracking
 * user_id, event_id, hours, projects, chairs, passengers, miles, ics, pin, drove, late, flaked
### trackingbyuser
 * event_id, user_id, passengers, miles, details, pin, drove, late, flaked
### user
 * user_name, user_address, user_phone, user_cell, user_email, family_id, class_id, major, user_aim, status_id, user_hidden, user_bday, shirt_id, style_id, last_login, ACCESS