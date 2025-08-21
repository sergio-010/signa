from marshmallow import Schema, fields, validate

class BrandSchema(Schema):
    """Schema para validar datos de marcas"""
    id = fields.Integer(dump_only=True)
    brandName = fields.String(
        required=True, 
        validate=validate.Length(min=1, max=255),
        error_messages={'required': 'El nombre de la marca es obligatorio'}
    )
    trademarkOwner = fields.String(
        required=True, 
        validate=validate.Length(min=1, max=255),
        error_messages={'required': 'El titular de la marca es obligatorio'}
    )
    status = fields.Boolean(required=True)
    createdAt = fields.DateTime(dump_only=True)
    updatedAt = fields.DateTime(dump_only=True)

class BrandCreateSchema(Schema):
    """Schema para crear una nueva marca"""
    brandName = fields.String(
        required=True, 
        validate=validate.Length(min=1, max=255)
    )
    trademarkOwner = fields.String(
        required=True, 
        validate=validate.Length(min=1, max=255)
    )
    status = fields.Boolean(required=True)

class BrandUpdateSchema(Schema):
    """Schema para actualizar una marca existente"""
    brandName = fields.String(validate=validate.Length(min=1, max=255))
    trademarkOwner = fields.String(validate=validate.Length(min=1, max=255))
    status = fields.Boolean()

# Instancias de los schemas
brand_schema = BrandSchema()
brands_schema = BrandSchema(many=True)
brand_create_schema = BrandCreateSchema()
brand_update_schema = BrandUpdateSchema()