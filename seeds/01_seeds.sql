INSERT INTO users (name, email, password) 
VALUES ('Berlin', 'berlin@moneyheist.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Professor', 'professor@moneyheist.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Tokyo', 'tokyo@moneyheist.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Lucifer Morningstar', 'lucifer@hell.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (title, description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bedrooms,number_of_bathrooms,country,street,city,province,post_code,active,owner_id) 
VALUES ('Berlin Pad','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',930,6,5,4,'Canada','651 Nami Road','Bohbatev','Alberta',86380, true,1),
('Heist Den','description','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg',2000,1,9,6,'Spain','123 Plan Street','Madrid','Badajoz',12345,true, 2),
('Blazing Villa', 'description','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',82640,0,5,5,'Canada','513 Powov Grove','Jaebvap','Ontario',38051,true,3),
('Hell Island','description','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350','https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg',2358,2,8,0,'Canada','1392 Gaza Junction','Upetafpuv','Nova Scotia',81059,true,4);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14'),
(4,4,'2020-12-23', '2021-01-05');

INSERT INTO property_reviews (message,rating,property_id,guest_id, reservation_id) 
VALUES ('message',3,1,1,1),
('Excellent',4,2,2,2),
('Good',3,3,3,3),
('Fine',2,4,4,4);
