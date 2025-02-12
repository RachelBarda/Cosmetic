CREATE DATABASE Cosmetic;

GO

USE Cosmetic;

GO

create Table Users(
user_ID Int IDENTITY(1,1) PRIMARY KEY,
email Varchar(255),
userPass varchar(255),
firstName Varchar(50),
lastName Varchar(50),
Phone varchar(11)

);

create Table Roles(
role_ID Int primary key,
role_Name Varchar(255)
);

create Table UsersRoles(
user_ID Int Foreign key references Users(User_ID),
userRole Int Foreign key references Roles(Role_ID)
);


create Table Suppliers(
supplier_ID Int Primary key,
supplier_Name Varchar(255),
contactPhone Varchar(20)
);

create Table Products(
product_ID Int IDENTITY(10,10) Primary key,
product_Name Varchar(255),
price Int,
description varchar(255),
supplier_ID Int Foreign key references Suppliers(Supplier_ID),
imgUrl Varchar(255)
);

create Table Services(
service_ID Int IDENTITY(100,5) Primary key,
service_Name Varchar(255),
description varchar(255),
price Int,
duration int,
imgUrl Varchar(255)
);

create Table Specializations(
employee_ID Int Foreign key references Users(User_ID),
skilfulness Int Foreign key references Services(service_ID)
);

create Table Employee_activities_days(
employee_ID Int Foreign Key references Users(User_ID),
day int,
start_Time Time,
end_Time Time,
Primary key (employee_Id,Day)
);

create Table Services_History(
service_ID Int Foreign Key references Services(Service_ID),
user_ID Int Foreign Key references Users(User_ID),
employee_ID Int Foreign Key references Users(User_ID),
serviceDate Date,
fromHour varchar(255),
toHour varchar(255),
Primary key(service_ID,User_ID,employee_ID)
);

create Table Orders(
order_ID Int IDENTITY(1,1) Primary key,
user_ID Int Foreign key references Users(User_ID),
orderDate DateTime
);
create Table Items(
product_ID Int Foreign Key references Products(product_ID),
order_ID Int Foreign Key references Orders(order_ID)
Primary key(product_ID,order_ID)
);

create Table contactMessages(
messageDate DateTime,
email varchar(255),
fullName varchar(255),
uMessage varchar(255)
)

GO

insert into Users values('Rachel.Barda@gmail.com','$2b$10$APh/8ZMkETv3IE3Xr4cR1.fHLWyExSS6U35PzVEtVF4EleCNotUxK','Rachel','Barda','054-6452101'),
                        ('Daniella.Cohen@gmail.com','$2b$10$yoEV5boH.MxHsUAcc6dSwe5mHNcdLdg2xZqu938llnHBi126wg7JW','Daniella','Cohen','054-0978654'),
	                ('Shir.Amar@walla.co.il','$2b$10$Ly3QHvL2QxfKBe8ZrcAMRe7h8UGtbdKJamKR2L5BMlP/09Tjje9dm','Shir','Amar','053-0897657'),
		        ('EyalShalom@gmail.com','$2b$10$.Sue4XiMdWg14YTnchOUMe9cG1UmvgWsVba1nhAI2oS19Oyu//0I.','Eyal','Shalom','055-9536357')

insert into Roles values(1,'Administrator'),
                        (2,'User'),
			            (3,'Employee')

insert into UsersRoles values(1,1),
(2,3),
(3,3),
(4,2)

insert into Suppliers values(155,'Loreal paris','053-4423444');
insert into Suppliers values(156,'Garnier','054-3944929');
insert into Suppliers values(157,'Shu uemura','058-6786656');
insert into Suppliers values(158,'Estee Lauder','054-3752522');
insert into Suppliers values(159,'Eua','052-9713568');
insert into Suppliers values(160,'Lotus','053-8643256');
insert into Suppliers values(161,'Fre','055-8703573');
insert into Suppliers values(162,'La tweez','054-9754443');
insert into Suppliers values(163,'Vida sleek','058-5464242');
insert into Suppliers values(164,'NovaClear','055-8543453');
insert into Suppliers values(165,'Nuonova','052-9086785');
insert into Suppliers values(166,'Olay','052-9654365');

insert into Products values('Sunscreen',80,'Enriched sunscreen from LOreal Paris',155,'https://media.ulta.com/i/ulta/2586725?w=1020&h=1020');
insert into Products values('Face Tonic',95,'Facial water for strengthening and firming the skin',157,'https://cdn.alexandar-cosmetics.com/media/cache/t760/images/products/612643926bed6_34461-tonik%20za%20lice.jpg');
insert into Products values('Face Tonic',100,'Facial water for powerful cleansing',158,'https://revuele.eu/wp-content/uploads/2020/06/EXPRESS-TONIC-Lift.png');
insert into Products values('Face Tonic',60,'eva tonic water for face',159,'https://images.faberlic.com/images/fl/TflGoods/md/1001270305326_16516641181.jpg');
insert into Products values('Protective Lotion',70,'Lotus Herbals Professional Phytorx Rejuvina Herbcomplex Protective Lotion - 100ml',160, 'https://cdn.shopify.com/s/files/1/0526/8655/3244/products/phytorx-rejuvina-herbcomplex-protective-lotion-lotus-professional-1.jpg?v=1665484394');
insert into Products values('Protetive Lotion',68,'Professional protective cream',161,'https://lilit.co.il/media/catalog/product/cache/b39fb8251ba699bf3f4c24530a481f62/3/2/3264680028878_1.jpg');
insert into Products values('Tweezers',30,'A set of tweezers from La Tweez',162,'https://www.sallybeauty.com/dw/image/v2/BCSM_PRD/on/demandware.static/-/Sites-SBS-SallyBeautySupply/default/dwd7c702ad/images/large/SBS-968001.jpg?sw=750&sh=750&sfrm=png');
insert into Products values('Wax',20,'Sugar wax for hair removal from vida sleek',163,'https://www.honeybeewax.com/cdn/shop/products/MY_Hot-Wax_2.jpg?v=1630567686');
insert into Products values('Acne Cream',100,'Cream for the treatment of oily skin',164,'https://novaclear.eu/wp-content/uploads/2022/07/novaclear-acne-cream-1024x1024.webp');
insert into Products values('Acne Cream',89,'Professional cream for acne treatment',165,'https://m.media-amazon.com/images/I/61Kf4vxsZWL.jpg');
insert into Products values('Micro sculpting cream',50,'Micro sculpting cream from Olay',166,'https://images.ctfassets.net/su0jtqat2bh5/1G3Bfbx7s2sD2eemeie4vs/232403a3725dfc480d69e40dcbf55918/00075609007415_C1N1_PRIMARY_CA2016Aug26124224.png');
insert into Products values('Revitalift crystal micosence',30,'Revitalift crystal micosence, Ultra-lightweight facial essence.',166,'https://csdam.net/digitalcontent/0/5712/57121430.jpg');

insert into Services values('Gel nail polish','Gel polish manicure in personal designs', 55,60,'https://m.media-amazon.com/images/I/711wVA2f9VL._SL1500_.jpg'),
                           ('Face care','Professional facial treatment for smooth and glowing skin',60,90,'https://www.forestessentialsindia.com/blog/wp-content/uploads/2021/12/1-1.jpg'),
						   ('Eyebrows design','Beautiful eyebrow design',30, 30,'https://femina.wwmindia.com/thumb/content/2018/oct/thumbnail1539534482.jpg?width=1200&height=900'),
						   ('Hair removal by wax','Hair removal by wax',15,30,'https://www.thelist.com/img/gallery/the-real-difference-between-sugaring-and-waxing/intro-1628787788.jpg'),
						   ('Hair removal by lazer','Hair removal by lazer', 30, 40,'https://www.livsmooth.com/wp-content/uploads/2020/01/iStock-1097329488.jpg')

insert into Specializations values(2,100);
insert into Specializations values(2,120);
insert into Specializations values(3,105);
insert into Specializations values(3,110);
insert into Specializations values(3,115);


insert into Employee_activities_days values(2,0,'08:30','18:00');
insert into Employee_activities_days values(2,1,'08:30','20:00');
insert into Employee_activities_days values(2,2,'09:00','20:00');
insert into Employee_activities_days values(2,3,'15:00','21:00');
insert into Employee_activities_days values(2 ,4,'12:00','21:00');
insert into Employee_activities_days values(3,0,'07:00','18:00');
insert into Employee_activities_days values(3,1,'09:30','21:00');
insert into Employee_activities_days values(3,2,'15:00','19:00');
insert into Employee_activities_days values(3,3,'08:00','16:00');
insert into Employee_activities_days values(3 ,4,'7:00','17:00');

Go

create or alter PROCEDURE [dbo].[getAllproducts]
as
Begin
select product_ID, product_Name,description,price, imgUrl , Suppliers.supplier_Name from products join Suppliers on Products.supplier_ID = Suppliers.supplier_ID;
End
go

create or alter PROCEDURE [dbo].[getPhoneNumByEmail]
@emailAddress varchar(255)
as
begin
select Phone from Users
where Users.email = @emailAddress
end
go

create or alter PROCEDURE [dbo].[getAllservices]
as
Begin
select * from Services;
End
go

create or alter PROCEDURE [dbo].[getRoleByEmail]
@emailAddr varchar(255)
as
Begin
select Roles.role_ID,Roles.role_Name from Users join UsersRoles on Users.user_ID = UsersRoles.user_ID join Roles on UsersRoles.userRole = Roles.role_ID
where Users.email = @emailAddr
End
go

create or alter PROCEDURE [dbo].[getUserByEmail]
@emailAddr varchar(255)
as
Begin
select * from users
where Users.email = @emailAddr
End
go

create or alter PROCEDURE [dbo].[insertUserToDB]
@firstName varchar(50),
@lastName  varchar(50),
@pass varchar(255),
@emailAddr varchar(255),
@phone varchar(11),
@roleName varchar(255) = 'User'

as
Begin
insert into Users values(@emailAddr,@pass,@firstName,@lastName,@phone)

declare @userId int
declare @roleId int

select @userId = USER_ID from Users where email = @emailAddr
select @roleId = Roles.role_ID from Roles where role_Name = @roleName

insert into UsersRoles values(@userId,@roleId);
End
go


create or alter PROCEDURE [dbo].[insertServiceHistory]
@employeeId int,
@userEmail varchar(255),
@serviceName varchar(255),
@serviceDate Date,
@fromHour varchar(255),
@toHour varchar(255)


as
Begin
declare @userId int
declare @serviceId int

select @userId = USER_ID from Users where email = @useremail
select @serviceId = service_ID from Services where service_Name = @serviceName

insert into Services_History values(@serviceId,@userId,@employeeId,@serviceDate,@fromHour,@toHour);
End
go

create or alter PROCEDURE [dbo].[getFutureServices]
as
Begin
select Services.service_Name,  Users.firstName + ' ' +  Users.lastName as 'User name', U.firstName + ' ' +  U.lastName as 'Employee name', Services_History.serviceDate,duration
from Users join Services_History on Users.user_ID = Services_History.user_ID join Users as U on U.user_ID = Services_History.employee_ID join Services on Services_History.service_ID = Services.service_ID
where Services_History.serviceDate >= GETDATE()
End
go

create or alter PROCEDURE [dbo].[getServicesHistory]
@fromDate Date,
@toDate Date
as
Begin
select Services.service_Name,  Users.firstName + ' ' +  Users.lastName as 'User name', U.firstName + ' ' +  U.lastName as 'Employee name', Services_History.serviceDate,fromHour,toHour,price
from Users join Services_History on Users.user_ID = Services_History.user_ID join Users as U on U.user_ID = Services_History.employee_ID join Services on Services_History.service_ID = Services.service_ID
where Services_History.serviceDate >= @fromDate and Services_History.serviceDate <= @toDate
End
go

create or alter PROCEDURE [dbo].[getUserByEmailAddrress]
@emailAddr varchar(255)
as
Begin
select * from Users where email = @emailAddr;
End
go

create or alter PROCEDURE [dbo].[getPasswordByEmailAddrress]
@emailAddr varchar(255)
as
Begin
select UserPass from Users where email = @emailAddr;
End
go

create or alter PROCEDURE [dbo].[getProductByProductId]
@id int
as
Begin
select product_ID, product_Name,description,price, imgUrl , Suppliers.supplier_Name from products join Suppliers on Products.supplier_ID = Suppliers.supplier_ID
where product_ID = @id;
End
go

create or alter PROCEDURE [dbo].[getServiceByServiceId]
@id int
as
Begin
select * from Services
where service_ID = @id;
End
go


create or alter PROCEDURE [dbo].[insertOrder]
@userEmail varchar(255)


as
Begin

declare @userId int
declare @oDate DateTime

set @oDate = GETDATE()
select @userId = USER_ID from Users where email = @useremail;

insert into Orders values(@userId,@oDate);
select order_ID from Orders where user_ID = @userId AND orderDate = @oDate
End
go



create or alter PROCEDURE [dbo].[insertItemsToOrder]
@orderID int,
@productID int

as
Begin


insert into Items values(@productID,@orderId);
End
go

create or alter PROCEDURE [dbo].[insertMessageToContact]
@email varchar(255),
@name varchar(255),
@message varchar(255)

as
Begin

declare @mDate DateTime

set @mDate = GETDATE()

insert into contactMessages values(@mDate,@email,@name,@message);
End
go

create or alter PROCEDURE [dbo].[getActivitiesDays]
as
Begin
select employee_ID,day,start_Time, end_Time, email, firstName + ' ' + lastName as 'Name', Phone from Employee_activities_days join Users on Employee_activities_days.employee_ID = Users.user_ID
End
go

create or alter PROCEDURE [dbo].[getMessagesFromCustomers]
@fromDate Date,
@toDate Date
as
Begin
select messageDate , email as 'CustomerEmail', fullName as 'CustomerName' ,uMessage  as 'CustomerMessage' from contactMessages
where messageDate >= @fromDate and messageDate <= @toDate
order by messageDate
End
go

create or alter PROCEDURE [dbo].[getAllUsers]

as
Begin
select firstName + ' ' + lastName as 'CustomerName' , email as 'CustomerEmail', Phone as 'CustomerPhone' from Users join UsersRoles on Users.user_ID = UsersRoles.user_ID where userRole = 2;
End
go

create or alter PROCEDURE [dbo].[getOrders]
@fromDate Date,
@toDate Date
as
Begin
select Users.firstName + ' ' + Users.lastName as 'CustomerName' , Orders.orderDate as 'OrderDate', Orders.order_ID as 'Order ID', count(Products.product_ID) as 'Products Amount', sum(price) as 'Total Price' from Orders join Items on Orders.order_ID = Items.order_ID join Products on Items.product_ID = Products.product_ID join Users on Orders.user_ID = Users.user_ID
where orderDate >= @fromDate and orderDate <= @toDate
Group by orderDate,Orders.order_ID, firstName, lastName
order by orderDate
End
go

create or alter PROCEDURE [dbo].[getOrderByID]
@orderId int
as
Begin
select orders.order_ID, orderDate, items.product_ID, product_Name,price, supplier_Name from orders join Items on orders.order_ID = Items.order_ID join Products on Items.product_ID = Products.product_ID join Suppliers on Products.supplier_ID = Suppliers.supplier_ID
where orders.order_ID = @orderId
End
go


