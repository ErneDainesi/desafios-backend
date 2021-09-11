insert into items set name='Fideos', category='Harina', stock=20;
insert into items set name='Leche', category='Lacteos', stock=30;
insert into items set name='Crema', category='Lacteos', stock=15;

select * from items;

DELETE FROM items WHERE id = 1;

update items set stock = 45 where id = 2;