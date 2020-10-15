const properties = require('./json/properties.json');
const users = require('./json/users.json');

//Establishing database connection
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  port: '5432',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT id, name, email, password
  FROM users
  WHERE email = $1;
  `;
  return pool.query(queryString,[email])
  .then(res => res.rows[0])
  .catch(err => console.log('Error',err));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT id, name, email, password
  FROM users
  WHERE id = $1;
  `;
  return pool.query(queryString,[id])
  .then(res => res.rows[0])
  .catch(err => console.log('Error',err));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *;
  `;
  const values = [user.name,user.email,user.password];
  return pool.query(queryString,values)
  .then(res => res.rows[0])
  .catch(err => console.log('Error',err));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT reservations.* , properties.*, AVG(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1 AND end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `;
  const values = [guest_id,limit];
  return pool.query(queryString,values)
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let queryParams = [];
  let queryString = `
    SELECT properties.*, AVG(rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id `;
  // Search properties based on city
  if (options.city) {
  queryParams.push(`%${options.city}%`);
  queryString += ` WHERE properties.city LIKE $${queryParams.length} `;
  }
  // Search properties based on owner
  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    if (queryParams.length === 1) {
    queryString += ` WHERE owner_id = $${queryParams.length} `;
    } else {
    queryString += ` AND owner_id = $${queryParams.length} `;
    } 
  }
  // Search properties based on minimum price night
  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night)*100);
    if (queryParams.length === 1) {
    queryString += ` WHERE cost_per_night >= $${queryParams.length} `;
    } else {
    queryString += ` AND cost_per_night >= $${queryParams.length} `;
    }
  }
 // Search properties based on maximum price night
  if (options.maximum_price_per_night) {
  queryParams.push(Number(options.maximum_price_per_night)*100);
  if (queryParams.length === 1) {
    queryString += ` WHERE cost_per_night < $${queryParams.length} `;
  } else {
  queryString += ` AND cost_per_night < $${queryParams.length} `;
  }
  }
  queryString += ` GROUP BY properties.id `;

  // Search properties based on minimum rating
  if (options.minimum_rating) {
  queryParams.push(Number(options.minimum_rating));
  queryString += ` HAVING AVG(rating) >= $${queryParams.length} `;
  }
  queryString += `ORDER BY cost_per_night `;
  queryParams.push(limit);
  queryString += ` LIMIT $${queryParams.length};`;
  return pool.query(queryString,queryParams)
  .then(res => res.rows) 
  .catch(err => console.log('Error', err));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
  const queryString = `
  INSERT INTO properties (title, description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bedrooms,number_of_bathrooms,country,street,city,province,post_code,owner_id) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *
  `;
  const values = [
    property.title, property.description, property.thumbnail_photo_url,property.cover_photo_url, Number(property.cost_per_night),
    Number(property.parking_spaces), Number(property.number_of_bedrooms),Number(property.number_of_bathrooms),property.country,property.street,
    property.city,property.province,property.post_code, Number(property.owner_id)
  ];

  return pool.query(queryString,values)
  .then(res => res.rows[0])
  .catch(err => console.log('Error', err));
}
exports.addProperty = addProperty;
