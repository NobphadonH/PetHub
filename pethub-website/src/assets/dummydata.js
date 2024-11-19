// export const hotelData = [
//   {
//     hotelID: 1,
//     hotelName: "Sunshine Resort",
//     hotelDescription:
//       "Sunshine Resort offers an unparalleled beachside experience, featuring luxurious accommodations, gourmet dining, and a wide array of recreational activities. Wake up to the sound of waves and spend your day lounging by the pool or exploring the vibrant local culture. Our resort is perfect for both couples seeking romance and families looking for adventure. Every room is designed with comfort and style in mind, providing breathtaking views and all the amenities you need for a memorable stay.",
//     hotelAddress: "50 Beach Road, เขตพระนคร, กรุงเทพ 10100",
//     hotelPolicy:
//       "Guests must present valid identification upon check-in. Check-in time is from 2 PM and check-out time is at 12 PM. Quiet hours are from 10 PM to 8 AM to ensure a peaceful environment for all guests. Smoking is strictly prohibited inside the rooms. Pets are allowed but must be kept on a leash in public areas. Additional fees may apply for pet-friendly rooms. All special requests are subject to availability and may incur additional charges.",
//     hotelType: "2",
//     avgReviewScore: "4.5000",
//     reviewCount: 25,
//     district: "เขตพระนคร",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 5000,
//     lowestPrice: 1200,
//     mapLat: "13.75671700",
//     mapLong: "100.50187500",
//     petTypeArray: ["สุนัข", "แมว"],
//     roomsAvailable: [
//       {
//         roomTypeID: 101,
//         roomTypeName: "Deluxe Sea View",
//         roomDetail: "Spacious room with a stunning sea view.",
//         roomSize: "35.00",
//         roomCapacity: 2,
//         pricePerNight: "3500.00",
//         petAllowedType: "สุนัข",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
//   {
//     hotelID: 2,
//     hotelName: "Mountain Escape",
//     hotelDescription:
//       "Nestled in the heart of the mountains, Mountain Escape offers a tranquil retreat surrounded by breathtaking natural beauty. Each room is thoughtfully designed to provide guests with a cozy and luxurious experience. Enjoy the crisp mountain air, scenic trails, and relaxing spa treatments. Our restaurant serves farm-to-table cuisine, and the entire property is pet-friendly, making it an ideal getaway for nature enthusiasts and their furry companions.",
//     hotelAddress: "88 Mountain View Lane, เขตดุสิต, กรุงเทพ 10300",
//     hotelPolicy:
//       "Check-in time is from 3 PM, and check-out is at 11 AM. A valid credit card is required to guarantee your reservation. Guests are expected to respect the tranquility of the resort, with quiet hours observed from 9 PM to 7 AM. Pets are welcome with prior notice, and a pet deposit may be required. Smoking is only permitted in designated outdoor areas. We provide daily housekeeping and offer concierge services for planning local excursions.",
//     hotelType: "3",
//     avgReviewScore: "4.2000",
//     reviewCount: 15,
//     district: "เขตดุสิต",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 3000,
//     lowestPrice: 800,
//     mapLat: "13.77683300",
//     mapLong: "100.51435200",
//     petTypeArray: ["แมว"],
//     roomsAvailable: [
//       {
//         roomTypeID: 102,
//         roomTypeName: "Standard Mountain Room",
//         roomDetail: "Cozy room with a view of the mountains.",
//         roomSize: "20.00",
//         roomCapacity: 2,
//         pricePerNight: "1200.00",
//         petAllowedType: "แมว",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
//   {
//     hotelID: 3,
//     hotelName: "City Center Hotel",
//     hotelDescription:
//       "City Center Hotel is located in the heart of the bustling metropolis, offering easy access to shopping, dining, and cultural attractions. Our modern rooms are equipped with high-speed Wi-Fi, flat-screen TVs, and luxurious bedding to ensure a comfortable stay. Guests can also enjoy our rooftop pool and fitness center. Whether you’re here for business or leisure, our hotel provides the perfect base to explore the vibrant city life.",
//     hotelAddress: "123 Main Street, เขตบางรัก, กรุงเทพ 10500",
//     hotelPolicy:
//       "Check-in starts at 3 PM, and check-out is at 12 PM. Photo ID and a credit card are required for check-in. Smoking is not allowed in any indoor area, and violators will be fined. Children under 12 stay free with a paying adult. Pets are not permitted, except for service animals. A 24-hour reception desk is available to assist guests with any needs. Early check-in or late check-out may be available upon request and is subject to availability.",
//     hotelType: "1",
//     avgReviewScore: "4.8000",
//     reviewCount: 50,
//     district: "เขตบางรัก",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 4000,
//     lowestPrice: 1500,
//     mapLat: "13.72780000",
//     mapLong: "100.52310000",
//     petTypeArray: ["ไม่มี"],
//     roomsAvailable: [
//       {
//         roomTypeID: 103,
//         roomTypeName: "Executive Suite",
//         roomDetail: "Luxurious suite with separate living area and city views.",
//         roomSize: "45.00",
//         roomCapacity: 3,
//         pricePerNight: "4000.00",
//         petAllowedType: "ไม่มี",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
//   {
//     hotelID: 4,
//     hotelName: "The Riverside Retreat",
//     hotelDescription:
//       "The Riverside Retreat is a luxurious escape located along the serene riverbanks. Our property boasts elegant rooms and suites, each with panoramic views of the river. Guests can enjoy gourmet dining, an infinity pool, and a spa that offers traditional Thai treatments. We also offer river cruises and guided tours of nearby cultural sites. Experience the perfect blend of relaxation and adventure in a picturesque setting.",
//     hotelAddress: "234 Riverside Drive, เขตบางเขน, กรุงเทพ 10220",
//     hotelPolicy:
//       "Guests are required to check in after 2 PM and check out before 11 AM. A security deposit is collected at check-in and refunded upon departure if no damages are incurred. The property enforces a strict no-smoking policy indoors. Pets are allowed only in designated pet-friendly rooms, and pet rules must be adhered to. Guests are advised to book spa treatments and river cruises in advance.",
//     hotelType: "4",
//     avgReviewScore: "4.6000",
//     reviewCount: 35,
//     district: "เขตบางเขน",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 7000,
//     lowestPrice: 2000,
//     mapLat: "13.84580000",
//     mapLong: "100.57110000",
//     petTypeArray: ["สุนัข", "แมว"],
//     roomsAvailable: [
//       {
//         roomTypeID: 104,
//         roomTypeName: "River View Suite",
//         roomDetail: "Spacious suite with river views and luxurious amenities.",
//         roomSize: "50.00",
//         roomCapacity: 4,
//         pricePerNight: "5000.00",
//         petAllowedType: "สุนัข",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
//   {
//     hotelID: 5,
//     hotelName: "Urban Oasis",
//     hotelDescription:
//       "Urban Oasis is a hidden gem in the heart of the city, offering a unique blend of urban excitement and tranquil relaxation. Our hotel features contemporary rooms with eco-friendly design elements. Guests can unwind in our rooftop garden, indulge in a massage at our wellness center, or take a dip in our outdoor pool. Urban Oasis is ideal for travelers looking for a modern, sustainable, and unforgettable experience.",
//     hotelAddress: "789 Oasis Road, เขตบางกะปิ, กรุงเทพ 10310",
//     hotelPolicy:
//       "Check-in begins at 2 PM, and check-out is at 12 PM. A government-issued ID and credit card are needed for check-in. Quiet hours from 10 PM to 7 AM ensure restful sleep for all guests. We are a pet-friendly hotel, but prior notification is required for pets. Smoking is only allowed in designated outdoor areas. Complimentary breakfast is served from 7 AM to 10 AM daily.",
//     hotelType: "5",
//     avgReviewScore: "4.9000",
//     reviewCount: 60,
//     district: "เขตบางกะปิ",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 6000,
//     lowestPrice: 1800,
//     mapLat: "13.75900000",
//     mapLong: "100.64750000",
//     petTypeArray: ["แมว"],
//     roomsAvailable: [
//       {
//         roomTypeID: 105,
//         roomTypeName: "Eco Deluxe Room",
//         roomDetail: "Modern eco-friendly room with green features.",
//         roomSize: "25.00",
//         roomCapacity: 2,
//         pricePerNight: "2200.00",
//         petAllowedType: "แมว",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
//   {
//     hotelID: 6,
//     hotelName: "Seaside Paradise",
//     hotelDescription:
//       "Seaside Paradise provides a breathtaking oceanfront experience with luxurious rooms and world-class amenities. Indulge in gourmet cuisine at our seaside restaurant or relax at the beachside bar. Our hotel offers various water sports, including snorkeling and paddleboarding. Every guest room features a private balcony with views of the ocean, making it the perfect destination for couples and families.",
//     hotelAddress: "321 Seaside Lane, เขตคลองสาน, กรุงเทพ 10600",
//     hotelPolicy:
//       "Guests must check in after 3 PM and check out by 12 PM. Early check-ins are subject to availability. Smoking is prohibited within the hotel premises. We are a pet-friendly establishment, and guests traveling with pets should inform the hotel in advance. Quiet hours are observed from 10 PM to 6 AM. Late check-outs may incur additional charges. The hotel provides complimentary beach towels and sun loungers.",
//     hotelType: "1",
//     avgReviewScore: "4.3000",
//     reviewCount: 40,
//     district: "เขตคลองสาน",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 8000,
//     lowestPrice: 2500,
//     mapLat: "13.71750000",
//     mapLong: "100.51080000",
//     petTypeArray: ["สุนัข"],
//     roomsAvailable: [
//       {
//         roomTypeID: 106,
//         roomTypeName: "Oceanfront Deluxe",
//         roomDetail: "Room with a stunning oceanfront view and private balcony.",
//         roomSize: "40.00",
//         roomCapacity: 3,
//         pricePerNight: "3000.00",
//         petAllowedType: "สุนัข",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
//   {
//     hotelID: 7,
//     hotelName: "The Heritage Hotel",
//     hotelDescription:
//       "The Heritage Hotel combines timeless elegance with modern convenience. Situated near historic landmarks, our hotel is perfect for guests who want to explore the city's rich history. Our rooms are tastefully decorated with classic furnishings and offer the latest in comfort. Dine in our elegant restaurant or relax in our sophisticated lounge. We also provide guided city tours to enhance your stay.",
//     hotelAddress: "567 Heritage Street, เขตดินแดง, กรุงเทพ 10400",
//     hotelPolicy:
//       "Check-in is available from 2 PM, and check-out is at 11 AM. A valid ID and credit card must be presented at check-in. Smoking is strictly prohibited in the hotel rooms and common areas. Service animals are allowed, but other pets are not permitted. Guests are requested to keep noise to a minimum to respect other visitors. Our front desk is staffed 24 hours to assist guests at any time.",
//     hotelType: "4",
//     avgReviewScore: "4.7000",
//     reviewCount: 30,
//     district: "เขตดินแดง",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 5500,
//     lowestPrice: 1800,
//     mapLat: "13.76420000",
//     mapLong: "100.55000000",
//     petTypeArray: ["ไม่มี"],
//     roomsAvailable: [
//       {
//         roomTypeID: 107,
//         roomTypeName: "Classic Room",
//         roomDetail: "Elegant room with classic decor and modern amenities.",
//         roomSize: "30.00",
//         roomCapacity: 2,
//         pricePerNight: "2000.00",
//         petAllowedType: "ไม่มี",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
//   {
//     hotelID: 8,
//     hotelName: "Garden Getaway",
//     hotelDescription:
//       "Garden Getaway is a serene sanctuary set in lush tropical gardens. Our hotel offers charming bungalows and suites, each with a private terrace overlooking the gardens. Guests can enjoy afternoon tea in the garden cafe, take part in yoga sessions, or simply relax in a hammock under the trees. Perfect for nature lovers and those seeking a peaceful retreat from city life.",
//     hotelAddress: "912 Garden Road, เขตห้วยขวาง, กรุงเทพ 10320",
//     hotelPolicy:
//       "Guests may check in starting at 2 PM and must check out by 12 PM. Smoking is permitted only in outdoor designated areas. We welcome pets in select garden bungalows, but prior arrangements must be made. Quiet hours are observed from 9 PM to 7 AM. All rooms include complimentary Wi-Fi and breakfast. Guests are advised to book garden tours and yoga sessions in advance to secure their spot.",
//     hotelType: "2",
//     avgReviewScore: "4.1000",
//     reviewCount: 20,
//     district: "เขตห้วยขวาง",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 3500,
//     lowestPrice: 1000,
//     mapLat: "13.76350000",
//     mapLong: "100.56890000",
//     petTypeArray: ["สุนัข"],
//     roomsAvailable: [
//       {
//         roomTypeID: 108,
//         roomTypeName: "Garden Bungalow",
//         roomDetail: "Cozy bungalow with a private terrace in the garden.",
//         roomSize: "28.00",
//         roomCapacity: 2,
//         pricePerNight: "1500.00",
//         petAllowedType: "สุนัข",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
//   {
//     hotelID: 9,
//     hotelName: "Skyline Suites",
//     hotelDescription:
//       "Skyline Suites is an upscale urban hotel that offers stunning panoramic views of the city skyline. Each suite is designed with sleek, modern furnishings and equipped with state-of-the-art technology. Enjoy fine dining in our rooftop restaurant, unwind at the spa, or work out in our 24-hour fitness center. Our hotel is perfect for business travelers and urban explorers.",
//     hotelAddress: "1010 Skyline Boulevard, เขตสาทร, กรุงเทพ 10120",
//     hotelPolicy:
//       "Check-in is from 3 PM, and check-out is by 11 AM. Smoking is not allowed within the hotel, including on balconies. Only service animals are permitted, and documentation may be required. Quiet hours are from 10 PM to 7 AM. Valet parking is available for an additional fee. Guests can enjoy complimentary access to the fitness center and rooftop amenities.",
//     hotelType: "5",
//     avgReviewScore: "4.8000",
//     reviewCount: 75,
//     district: "เขตสาทร",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 9000,
//     lowestPrice: 3000,
//     mapLat: "13.72040000",
//     mapLong: "100.52770000",
//     petTypeArray: ["ไม่มี"],
//     roomsAvailable: [
//       {
//         roomTypeID: 109,
//         roomTypeName: "Skyline Suite",
//         roomDetail:
//           "Luxurious suite with floor-to-ceiling windows and city views.",
//         roomSize: "60.00",
//         roomCapacity: 4,
//         pricePerNight: "6000.00",
//         petAllowedType: "ไม่มี",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
//   {
//     hotelID: 10,
//     hotelName: "Boutique Villa",
//     hotelDescription:
//       "Boutique Villa offers a charming and intimate experience, set in a beautifully restored colonial building. Each room is uniquely decorated with vintage furnishings and modern amenities. Our guests can enjoy a complimentary breakfast served in the sunny courtyard. The villa also features a library and a lounge area, making it a cozy spot to relax and unwind.",
//     hotelAddress: "1515 Boutique Lane, เขตบางซื่อ, กรุงเทพ 10800",
//     hotelPolicy:
//       "Check-in starts at 2 PM, and check-out is at 11 AM. Smoking is prohibited throughout the property. We welcome small pets with prior notice and a non-refundable pet fee. Quiet hours are observed from 9 PM to 8 AM to ensure a peaceful environment for all guests. The villa provides complimentary Wi-Fi, daily housekeeping, and a concierge service to assist with travel arrangements.",
//     hotelType: "3",
//     avgReviewScore: "4.5000",
//     reviewCount: 25,
//     district: "เขตบางซื่อ",
//     hotelPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//     highestPrice: 4500,
//     lowestPrice: 1600,
//     mapLat: "13.80350000",
//     mapLong: "100.53980000",
//     petTypeArray: ["สุนัข", "แมว"],
//     roomsAvailable: [
//       {
//         roomTypeID: 110,
//         roomTypeName: "Colonial Room",
//         roomDetail: "Elegant room with vintage decor and modern amenities.",
//         roomSize: "32.00",
//         roomCapacity: 2,
//         pricePerNight: "1800.00",
//         petAllowedType: "สุนัข",
//         roomPhoto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
//       },
//     ],
//   },
// ];

export const hotelData = [
    {
      "avgReviewScore": "4.5000",
      "district": "เขตพระนคร",
      "hotelAddress": "45 ถนนข้าวสาร แขวงตลาดยอด เขตพระนคร กรุงเทพ 10200",
      "hotelDescription": "โรงแรมสไตล์บูติกสุดหรูที่ให้บริการที่พักชั้นเลิศและการดูแลสัตว์เลี้ยงอย่างอบอุ่น ท่ามกลางบรรยากาศที่เงียบสงบและเต็มไปด้วยความสะดวกสบาย คุณและสัตว์เลี้ยงของคุณจะได้พักผ่อนในห้องที่ตกแต่งอย่างหรูหรา พร้อมเพลิดเพลินกับบริการอันแสนพิเศษจากทีมงานที่มีความเชี่ยวชาญในการดูแลสัตว์เลี้ยงทุกชนิด โรงแรมยังมีสิ่งอำนวยความสะดวกมากมาย เช่น พื้นที่เล่นสำหรับสัตว์เลี้ยงและบริการสปาสัตว์เลี้ยงเพื่อเพิ่มความสุขให้กับเพื่อนสี่ขาของคุณ",
      "hotelID": 1,
      "hotelName": "Royal Pet Palace",
      "hotelPhoto": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "hotelPolicy": "สัตว์เลี้ยงสามารถพักได้ทุกส่วนของโรงแรม แต่ต้องอยู่ภายใต้การดูแลของเจ้าของอย่างใกล้ชิด ห้ามปล่อยสัตว์เลี้ยงวิ่งเล่นในพื้นที่สาธารณะโดยไม่มีสายจูง และเจ้าของต้องเก็บทำความสะอาดทันทีหากสัตว์เลี้ยงทำเลอะเทอะ นอกจากนี้ สัตว์เลี้ยงทุกตัวต้องได้รับวัคซีนครบถ้วนและมีใบรับรองสุขภาพจากสัตวแพทย์",
      "hotelType": "2",
      "mapLat": "13.75630000",
      "mapLong": "100.50180000",
      "reviewCount": 25,
      "roomsAvailable": [
        {
          "petAllowedType": "สุนัข",
          "pricePerNight": "150.00",
          "roomCapacity": 2,
          "roomDetail": "ห้องพักขนาดกลางสำหรับเจ้าของและสัตว์เลี้ยงที่เดินทางมาด้วยกัน มีเตียงนอนแสนสบายและระเบียงส่วนตัว",
          "roomPhoto": "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "roomSize": "15.00",
          "roomTypeID": 11,
          "roomTypeName": "Deluxe Room"
        },
        {
          "petAllowedType": "แมว",
          "pricePerNight": "180.00",
          "roomCapacity": 1,
          "roomDetail": "ห้องพักสำหรับแมวที่มีพื้นที่เล่นพิเศษและมุมพักผ่อนที่อบอุ่น",
          "roomPhoto": "https://plus.unsplash.com/premium_photo-1661926818635-3d413932f2a9?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "roomSize": "10.00",
          "roomTypeID": 16,
          "roomTypeName": "Cat Suite"
        }
      ]
    },
    {
      "avgReviewScore": "3.8000",
      "district": "เขตบางรัก",
      "hotelAddress": "99 ถนนเจริญกรุง แขวงบางรัก เขตบางรัก กรุงเทพ 10500",
      "hotelDescription": "โรงแรมบรรยากาศสุดชิลที่พร้อมต้อนรับสัตว์เลี้ยงและเจ้าของด้วยบริการอันแสนพิเศษ ตั้งอยู่ในย่านใจกลางเมืองที่สะดวกต่อการเดินทาง ห้องพักทุกห้องถูกออกแบบมาเพื่อรองรับการเข้าพักของคุณและสัตว์เลี้ยง ไม่ว่าจะเป็นสุนัข แมว หรือสัตว์เลี้ยงชนิดอื่น คุณจะพบกับพื้นที่ส่วนตัวที่กว้างขวางและพื้นที่พักผ่อนสำหรับสัตว์เลี้ยงที่มีความปลอดภัยและสะดวกสบาย",
      "hotelID": 2,
      "hotelName": "Pet Haven Hotel",
      "hotelPhoto": "https://images.unsplash.com/photo-1625959157952-fb2b24f7c272?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "hotelPolicy": "สัตว์เลี้ยงต้องอยู่ภายใต้การดูแลของเจ้าของทุกเวลา ห้ามปล่อยสัตว์เลี้ยงโดยไม่มีการควบคุมเพื่อความปลอดภัย หากสัตว์เลี้ยงมีพฤติกรรมก้าวร้าวหรือสร้างความรำคาญ เจ้าของอาจถูกขอให้นำสัตว์เลี้ยงออกจากบริเวณนั้น โปรดตรวจสอบให้แน่ใจว่าสัตว์เลี้ยงของคุณมีสุขภาพดีและได้รับวัคซีนครบก่อนการเข้าพัก",
      "hotelType": "3",
      "mapLat": "13.72300000",
      "mapLong": "100.51400000",
      "reviewCount": 15,
      "roomsAvailable": [
        {
          "petAllowedType": "แมว",
          "pricePerNight": "120.00",
          "roomCapacity": 1,
          "roomDetail": "ห้องราคาประหยัดที่เหมาะสำหรับแมวและเจ้าของที่ต้องการพักผ่อน มีมุมเล่นและของเล่นแมว",
          "roomPhoto": "https://images.unsplash.com/photo-1612152605347-f93296cb657d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "roomSize": "10.00",
          "roomTypeID": 12,
          "roomTypeName": "Budget Room"
        },
        {
          "petAllowedType": "กระต่าย",
          "pricePerNight": "110.00",
          "roomCapacity": 1,
          "roomDetail": "ห้องสำหรับกระต่ายพร้อมคอกพิเศษและของเล่นกระต่าย",
          "roomPhoto": "https://images.unsplash.com/photo-1538683270504-3d09ad7ae739?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "roomSize": "8.00",
          "roomTypeID": 17,
          "roomTypeName": "Rabbit Room"
        }
      ]
    },
    {
      "avgReviewScore": "4.2000",
      "district": "เขตบางนา",
      "hotelAddress": "88 ซอยบางนา-ตราด 15 เขตบางนา กรุงเทพ 10260",
      "hotelDescription": "โรงแรมที่มีสิ่งอำนวยความสะดวกครบครันและต้อนรับสัตว์เลี้ยงทุกชนิด ด้วยพื้นที่สีเขียวขนาดใหญ่และลานวิ่งเล่นที่ปลอดภัยสำหรับสัตว์เลี้ยง โรงแรมยังมีบริการพิเศษ เช่น คลาสฝึกสัตว์เลี้ยงและบริการอาบน้ำ-ตัดขนจากทีมงานมืออาชีพ ทำให้วันหยุดของคุณและสัตว์เลี้ยงเป็นวันที่สมบูรณ์แบบและไม่มีความกังวล",
      "hotelID": 3,
      "hotelName": "Bangna Pet Resort",
      "hotelPhoto": "https://images.unsplash.com/photo-1667842288007-ea49b67ce9cf?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "hotelPolicy": "สัตว์เลี้ยงต้องได้รับการตรวจสุขภาพและมีใบรับรองก่อนเข้าพัก เจ้าของต้องมีสายจูงติดตัวเสมอเมื่อพาสัตว์เลี้ยงออกจากห้องพัก และห้ามปล่อยสัตว์เลี้ยงอยู่ตามลำพังในห้องพักโดยไม่มีการดูแล",
      "hotelType": "1",
      "mapLat": "13.66880000",
      "mapLong": "100.60400000",
      "reviewCount": 40,
      "roomsAvailable": [
        {
          "petAllowedType": "กระต่าย",
          "pricePerNight": "130.00",
          "roomCapacity": 3,
          "roomDetail": "ห้องขนาดใหญ่พิเศษพร้อมลานวิ่งเล่นสำหรับสัตว์เลี้ยง มีเตียงขนาดใหญ่และโซนผ่อนคลาย",
          "roomPhoto": "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "roomSize": "20.00",
          "roomTypeID": 13,
          "roomTypeName": "Family Suite"
        },
        {
          "petAllowedType": "สุนัข",
          "pricePerNight": "140.00",
          "roomCapacity": 2,
          "roomDetail": "ห้องพักสำหรับสุนัขพร้อมสวนส่วนตัวและเครื่องเล่นออกกำลังกาย",
          "roomPhoto": "https://images.unsplash.com/photo-1612152605347-f93296cb657d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "roomSize": "12.00",
          "roomTypeID": 18,
          "roomTypeName": "Dog Room"
        }
      ]
    },
    {
      "avgReviewScore": "3.5000",
      "district": "เขตดอนเมือง",
      "hotelAddress": "456 ถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพ 10210",
      "hotelDescription": "โรงแรมสำหรับสัตว์เลี้ยงที่ใกล้สนามบิน เหมาะสำหรับการเดินทางโดยเครื่องบิน ให้บริการห้องพักสะดวกสบายและราคาย่อมเยา เหมาะสำหรับการพักผ่อนระหว่างรอเที่ยวบิน โรงแรมยังมีบริการพิเศษ เช่น บริการขนส่งสัตว์เลี้ยงไปยังสนามบิน และพื้นที่จอดรถที่ปลอดภัยสำหรับผู้เข้าพัก",
      "hotelID": 4,
      "hotelName": "Donmuang Pet Stop",
      "hotelPhoto": "https://images.unsplash.com/photo-1538683270504-3d09ad7ae739?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "hotelPolicy": "สัตว์เลี้ยงห้ามเข้าในห้องอาหารและต้องมีสายจูงทุกครั้งเมื่ออยู่ในพื้นที่สาธารณะ หากสัตว์เลี้ยงมีอาการเจ็บป่วยต้องแจ้งเจ้าหน้าที่ทันทีเพื่อความปลอดภัย",
      "hotelType": "4",
      "mapLat": "13.91260000",
      "mapLong": "100.60700000",
      "reviewCount": 12,
      "roomsAvailable": [
        {
          "petAllowedType": "นก",
          "pricePerNight": "80.00",
          "roomCapacity": 2,
          "roomDetail": "ห้องพักสไตล์เรียบง่ายพร้อมกรงนกและอุปกรณ์สำหรับดูแลนก",
          "roomPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
          "roomSize": "8.00",
          "roomTypeID": 14,
          "roomTypeName": "Standard Room"
        },
        {
          "petAllowedType": "แมว",
          "pricePerNight": "90.00",
          "roomCapacity": 1,
          "roomDetail": "ห้องสำหรับแมวที่มีพื้นที่เล่นและหน้าต่างชมวิวสนามบิน",
          "roomPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
          "roomSize": "10.00",
          "roomTypeID": 19,
          "roomTypeName": "Cat Room"
        }
      ]
    },
    {
      "avgReviewScore": "4.8000",
      "district": "เขตสาทร",
      "hotelAddress": "123 ถนนสาทรเหนือ แขวงยานนาวา เขตสาทร กรุงเทพ 10120",
      "hotelDescription": "โรงแรมหรูหราใจกลางเมือง ที่ให้บริการที่พักและดูแลสัตว์เลี้ยงอย่างหรูหรา ห้องพักทุกห้องได้รับการออกแบบอย่างพิถีพิถัน พร้อมสิ่งอำนวยความสะดวกที่ครบครันและบริการระดับห้าดาว ที่นี่เหมาะสำหรับผู้ที่ต้องการประสบการณ์พักผ่อนสุดพิเศษและมีสัตว์เลี้ยงร่วมเดินทางด้วย มีบริการพิเศษเช่น ฟิตเนสสำหรับสัตว์เลี้ยง และอาหารสัตว์เลี้ยงที่ปรุงสดใหม่จากเชฟผู้เชี่ยวชาญ",
      "hotelID": 5,
      "hotelName": "Sathorn Luxury Pet Hotel",
      "hotelPhoto": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "hotelPolicy": "ไม่อนุญาตให้สัตว์เลี้ยงที่มีเสียงดังรบกวนแขกคนอื่น สัตว์เลี้ยงต้องอยู่ในสายจูงเมื่ออยู่นอกห้องพัก และเจ้าของต้องรับผิดชอบต่อความสะอาดของสัตว์เลี้ยงตลอดการเข้าพัก",
      "hotelType": "1",
      "mapLat": "13.72340000",
      "mapLong": "100.53600000",
      "reviewCount": 60,
      "roomsAvailable": [
        {
          "petAllowedType": "สุนัข",
          "pricePerNight": "250.00",
          "roomCapacity": 4,
          "roomDetail": "ห้องพักสุดหรูพร้อมวิวเมืองสำหรับสุนัขและเจ้าของ มีอ่างอาบน้ำและพื้นที่เล่นส่วนตัว",
          "roomPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
          "roomSize": "25.00",
          "roomTypeID": 15,
          "roomTypeName": "Presidential Suite"
        },
        {
          "petAllowedType": "แมว",
          "pricePerNight": "200.00",
          "roomCapacity": 2,
          "roomDetail": "ห้องพักสำหรับแมวที่มีคอนโดแมวและของเล่นสุดหรู",
          "roomPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
          "roomSize": "18.00",
          "roomTypeID": 20,
          "roomTypeName": "Luxury Cat Room"
        }
      ]
    },
    {
        "avgReviewScore": "4.7000",
        "district": "เขตวัฒนา",
        "hotelAddress": "234 ถนนสุขุมวิท 23 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพ 10110",
        "hotelDescription": "โรงแรมสไตล์โมเดิร์นที่พร้อมต้อนรับสัตว์เลี้ยงทุกประเภท พร้อมด้วยบริการสุดล้ำ เช่น ห้องฝึกสุนัขอัจฉริยะและคลินิกสัตว์เลี้ยงในตัว ที่พักของคุณและสัตว์เลี้ยงจะได้รับการดูแลอย่างดีเยี่ยม พร้อมเพลิดเพลินกับสิ่งอำนวยความสะดวกที่ทันสมัยในบรรยากาศใจกลางเมือง",
        "hotelID": 6,
        "hotelName": "Urban Pet Oasis",
        "hotelPhoto": "https://plus.unsplash.com/premium_photo-1681922761648-d5e2c3972982?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "hotelPolicy": "สัตว์เลี้ยงต้องได้รับการควบคุมตลอดเวลาในพื้นที่สาธารณะ และห้ามนำสัตว์เลี้ยงเข้าไปในบริเวณที่ห้าม เจ้าของต้องแสดงหลักฐานวัคซีนก่อนเข้าพักและรับผิดชอบต่อความสะอาดของสัตว์เลี้ยงเอง",
        "hotelType": "2",
        "mapLat": "13.74280000",
        "mapLong": "100.56480000",
        "reviewCount": 45,
        "roomsAvailable": [
          {
            "petAllowedType": "สุนัข",
            "pricePerNight": "220.00",
            "roomCapacity": 3,
            "roomDetail": "ห้องพรีเมียมพร้อมวิวเมืองและพื้นที่พักผ่อนสำหรับสุนัข พร้อมเตียงคู่และโซนพักผ่อนสุดหรู",
            "roomPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
            "roomSize": "22.00",
            "roomTypeID": 21,
            "roomTypeName": "Premium Dog Suite"
          },
          {
            "petAllowedType": "แมว",
            "pricePerNight": "150.00",
            "roomCapacity": 1,
            "roomDetail": "ห้องพักกว้างขวางพร้อมเครื่องเล่นและมุมพักผ่อนสำหรับแมวโดยเฉพาะ",
            "roomPhoto": "https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "roomSize": "12.00",
            "roomTypeID": 22,
            "roomTypeName": "Cat Deluxe Room"
          }
        ]
      },
      {
        "avgReviewScore": "4.1000",
        "district": "เขตลาดพร้าว",
        "hotelAddress": "789 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพ 10900",
        "hotelDescription": "ที่พักแสนอบอุ่นสำหรับสัตว์เลี้ยงที่รัก พร้อมด้วยสนามหญ้ากว้างและโซนออกกำลังกาย โรงแรมมีบริการสัตว์เลี้ยงครบวงจร เช่น บริการกรูมมิ่งและฝึกอบรมเบื้องต้นในบรรยากาศที่เหมาะกับสัตว์เลี้ยงทุกขนาดและสายพันธุ์",
        "hotelID": 7,
        "hotelName": "Ladprao Pet Retreat",
        "hotelPhoto": "https://images.unsplash.com/photo-1594741158704-5a784b8e59fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "hotelPolicy": "สัตว์เลี้ยงทุกตัวต้องมีสายจูงเมื่ออยู่นอกห้อง เจ้าของต้องแสดงใบรับรองสุขภาพและรับผิดชอบต่อสัตว์เลี้ยงหากเกิดอุบัติเหตุหรือเสียหายใดๆ",
        "hotelType": "3",
        "mapLat": "13.82720000",
        "mapLong": "100.57640000",
        "reviewCount": 30,
        "roomsAvailable": [
          {
            "petAllowedType": "กระต่าย",
            "pricePerNight": "90.00",
            "roomCapacity": 2,
            "roomDetail": "ห้องกระต่ายพร้อมพื้นที่เล่นพิเศษและของเล่นหลากหลาย",
            "roomPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
            "roomSize": "9.00",
            "roomTypeID": 23,
            "roomTypeName": "Bunny Play Room"
          },
          {
            "petAllowedType": "นก",
            "pricePerNight": "70.00",
            "roomCapacity": 1,
            "roomDetail": "ห้องนกพร้อมกรงขนาดใหญ่และวิวสวน",
            "roomPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
            "roomSize": "7.00",
            "roomTypeID": 24,
            "roomTypeName": "Bird Haven Room"
          }
        ]
      },
      {
        "avgReviewScore": "3.6000",
        "district": "เขตห้วยขวาง",
        "hotelAddress": "555 ถนนรัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10310",
        "hotelDescription": "โรงแรมที่พร้อมต้อนรับสัตว์เลี้ยงทุกสายพันธุ์ พร้อมด้วยสิ่งอำนวยความสะดวกสำหรับสัตว์เลี้ยง เช่น ลานออกกำลังกายกลางแจ้งและคาเฟ่สำหรับเจ้าของสัตว์เลี้ยง ให้คุณได้ใช้เวลาคุณภาพร่วมกับเพื่อนรักสี่ขาในบรรยากาศทันสมัยและสนุกสนาน",
        "hotelID": 8,
        "hotelName": "Ratchada Pet Stay",
        "hotelPhoto": "https://images.unsplash.com/photo-1506399790179-ddf35cdb2675?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "hotelPolicy": "สัตว์เลี้ยงต้องได้รับวัคซีนและมีสุขภาพแข็งแรงก่อนเข้าพัก เจ้าของต้องมีสายจูงและต้องดูแลสัตว์เลี้ยงอย่างใกล้ชิดเมื่ออยู่ในพื้นที่ส่วนกลาง",
        "hotelType": "2",
        "mapLat": "13.77080000",
        "mapLong": "100.57700000",
        "reviewCount": 20,
        "roomsAvailable": [
          {
            "petAllowedType": "แมว",
            "pricePerNight": "110.00",
            "roomCapacity": 1,
            "roomDetail": "ห้องแมวพร้อมกระจกชมวิวและโซนพักผ่อนส่วนตัว",
            "roomPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
            "roomSize": "10.00",
            "roomTypeID": 25,
            "roomTypeName": "Cat Comfort Room"
          },
          {
            "petAllowedType": "สุนัข",
            "pricePerNight": "130.00",
            "roomCapacity": 2,
            "roomDetail": "ห้องสำหรับสุนัขพร้อมเตียงแสนสบายและพื้นที่ออกกำลังกาย",
            "roomPhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
            "roomSize": "14.00",
            "roomTypeID": 26,
            "roomTypeName": "Dog Adventure Room"
          }
        ]
      },
  ]
  