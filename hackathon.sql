create database doctordesk;
use doctordesk;

CREATE TABLE hospital (
    H_id varchar(6) PRIMARY KEY,
    H_name text,
    H_location text,
    H_description TEXT,
    NIN_id VARCHAR(10),
    H_password varchar(20),
    H_pic1 text,
    H_pic2 text,
    H_pic3 text,
    H_pic4 text,
    H_pic5 text
);


CREATE TABLE doctors (
    D_id varchar(8) PRIMARY KEY,
    D_FName text,
    D_LName text,
    D_specialize text,
    D_phonenum VARCHAR(10),
    D_email varchar(50),
    D_password varchar(20),
    D_desc text,
    D_profile text,
    gender varchar(10),
    H_id varchar(6),
    foreign key (H_id) references hospital(H_id)
);

drop table hospital;

create table H_rating(
	H_id varchar(8),
	rating float,
    foreign key (H_id) references hospital(H_id)
);

-- Many to many joining table 
CREATE TABLE doctor_hospital (
    D_id varchar(8),
    H_id varchar(6),
    PRIMARY KEY (D_id, H_id),
    FOREIGN KEY (D_id) REFERENCES doctors(D_id) ON DELETE CASCADE,
    FOREIGN KEY (H_id) REFERENCES hospital(H_id) ON DELETE CASCADE
);

create table patients(
	P_id varchar(20) primary key,
    P_FName text,
    p_LName text,
    P_Bdate text,
    P_Address text,
    P_phonenum varchar(10),
    P_password varchar(20),
    gender varchar(10),
    p_email text
);


create table appointments(
	A_id varchar(12) primary key,
    P_id varchar(9),
	D_id varchar(8),
    H_id varchar(6),
    time datetime default now(),
	health_issue text,
    status varchar(1),
    foreign key (D_id) references doctors(D_id),
    foreign key (H_id) references hospital(H_id),
    foreign key (P_id) references patients(P_id)
);

drop table appointments;
update appointments set status = "2" where A_id = "1";
show triggers;

alter table appointments add status varchar(1) default 0;
select * from appointments;
select A_id, P_id, D_id, H_id, time, health_issue, if(status = "0", "Pending", 
if(status = "1", "Approved", if(status = "2", "Rejected", "Invalid"))) as status from appointments;

alter table patients modify column P_id varchar(9);
show tables;

show tables;
drop table available_patient_ids;

insert into hospital(H_name, H_location, H_description, H_photos, NIN_id) 
values ("ABC", "Pune", "Hospital description", "abc.jpg, hbg.jpg", "1234567890");
insert into patients(P_FName, p_LName, P_Bdate, P_Address, P_phonenum, P_password) 
values ("vedant", "patil", "2005-07-31", "jai malhar city, moze nagar, lohegaon, pune", 
"1234567890", "pass");

desc patients;
desc hospital;
desc doctors;

