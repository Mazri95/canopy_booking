-- Add unique index on Product.name
CREATE UNIQUE INDEX IF NOT EXISTS "Product_name_key" ON "Product"("name");
