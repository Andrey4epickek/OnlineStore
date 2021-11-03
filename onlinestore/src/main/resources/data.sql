
INSERT INTO public.users(first_name, last_name, date_of_birth, email, password, photo, phone, role)
VALUES ('Andrey', 'Novitskiy', '2001-04-09', 'andrey@mail.ru',
        '$2a$04$j91vSdzuy8Bvwwp48Gp0WuMJjPW1zZjFUXitJPICmLEWMlTKeDJ3G', 'Java.jpg', '+375 336242540', 'ADMIN');

INSERT INTO public.users(first_name, last_name, date_of_birth, email, password, photo, phone, role)
VALUES ('Vasya', 'Pupkin', '2001-05-10', 'vasya@mail.ru',
        '$2a$04$qkA7tYqctOYnx9b0ncu8Se4Lh50V89yhFYHAndLOhpWTeWimvBiNa', 'Java_logo.png', '+375 2925844546', 'USER');

INSERT INTO public.users(first_name, last_name, date_of_birth, email, password, photo, phone, role)
VALUES ('Petr', 'Petrov', '2001-06-15', 'petr@mail.ru',
        '$2a$04$CZbMHXJfJvAS1PSHEwDDo.ux79BZ4olJJALm736p3xnOY4RKY5eNG', 'cat.jpg', '+375 256859454', 'ADMIN_READ_ONLY');

INSERT INTO public.products(name, price)
VALUES ('apple', 5);

INSERT INTO public.products(name, price)
VALUES ('grape', 8);

INSERT INTO public.products(name, price)
VALUES ('orange', 6);
