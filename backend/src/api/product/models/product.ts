// src/api/product/models/product.ts

export default {
    info: {
      singularName: 'product',
      pluralName: 'products',
      displayName: 'Product',
    },
    options: {
      draftAndPublish: true,
    },
    attributes: {
      productName: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'text',
      },
      initialPrice: {
        type: 'decimal',
        required: true,
      },
      minimalBid: {
        type: 'decimal',
        required: true,
      },
      slug: {
        type: 'string',
        unique: true,
      },
      cover: {
        type: 'media',
        multiple: false,
        required: true,
      },
      aditionalImages: {
        type: 'media',
        multiple: true,
      },
    },
  };
  