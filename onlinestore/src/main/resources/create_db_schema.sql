
CREATE TABLE public.products (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying NOT NULL,
    price integer NOT NULL,
    CONSTRAINT name_length CHECK ((length((name)::text) > 0)),
    CONSTRAINT name_pattern CHECK (((name)::text ~* '[a-zA-Z]{1,50}'::text)),
    CONSTRAINT price_max_size CHECK ((price <= 100500)),
    CONSTRAINT price_min_size CHECK ((price >= 1))
);

CREATE TABLE public.users (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    date_of_birth date NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    photo character varying,
    phone character varying,
    role character varying,
    CONSTRAINT email_length CHECK ((length((email)::text) > 0)),
    CONSTRAINT email_pattern CHECK (((email)::text ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text)),
    CONSTRAINT "firstName_length" CHECK ((length((first_name)::text) > 0)),
    CONSTRAINT firstname_pattern CHECK (((first_name)::text ~* '[a-zA-Z]{1,50}'::text)),
    CONSTRAINT "lastName_length" CHECK ((length((last_name)::text) > 0)),
    CONSTRAINT "lastName_pattern" CHECK (((last_name)::text ~* '[a-zA-Z]{1,50}'::text)),
    CONSTRAINT password_length CHECK ((length((password)::text) > 0)),
    CONSTRAINT phone_length CHECK ((length((phone)::text) > 0)),
    CONSTRAINT phone_pattern CHECK (((phone)::text ~* '^\+(?:[0-9] ?){6,14}[0-9]$'::text))
);

ALTER TABLE public.products OWNER TO root;
ALTER TABLE public.users OWNER TO root;

ALTER TABLE ONLY public.products
    ADD CONSTRAINT goods_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
