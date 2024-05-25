CREATE TABLE "contribute" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "product_id" integer,
  "jumlah_contribute" integer,
  "created_at" timestamp,
  "last_modified" timestamp
);

CREATE TABLE "activity" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "product_id" integer,
  "nama" varchar,
  "nutrisi" varchar,
  "created_at" timestamp
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "jenis_kelamin" varchar,
  "tanggal_lahir" integer,
  "berat_badan" integer,
  "tinggi_badan" integer
);

CREATE TABLE "product" (
  "id" integer PRIMARY KEY,
  "category_id" integer,
  "company_id" integer,
  "brand_id" integer,
  "nama" varchar,
  "porsi" integer,
  "kalori" integer,
  "lemak" integer,
  "protein" integer,
  "karbohidrat" integer,
  "gula" integer,
  "garam" integer,
  "kalium" integer,
  "last_modified" timestamp,
  "created_at" timestamp
);

CREATE TABLE "company" (
  "id" integer,
  "nama" varchar,
  "last_modified" timestamp,
  "created_at" timestamp
);

CREATE TABLE "category" (
  "id" integer,
  "nama" varchar,
  "created_at" timestamp,
  "last_modified" timestamp
);

CREATE TABLE "brand" (
  "id" integer,
  "nama" varchar,
  "created_at" timestamp,
  "last_modified" timestamp
);

ALTER TABLE "product" ADD FOREIGN KEY ("id") REFERENCES "users" ("id");

ALTER TABLE "category" ADD FOREIGN KEY ("id") REFERENCES "product" ("category_id");

ALTER TABLE "company" ADD FOREIGN KEY ("id") REFERENCES "product" ("company_id");

ALTER TABLE "brand" ADD FOREIGN KEY ("id") REFERENCES "product" ("brand_id");

ALTER TABLE "activity" ADD FOREIGN KEY ("id") REFERENCES "users" ("id");

ALTER TABLE "contribute" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("id") REFERENCES "activity" ("product_id");

ALTER TABLE "product" ADD FOREIGN KEY ("id") REFERENCES "contribute" ("product_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "activity" ("user_id");
