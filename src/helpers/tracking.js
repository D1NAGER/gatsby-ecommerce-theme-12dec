export const pushToDataLayer = (eventName, ecommerceData = {}) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: eventName,
    ecommerce: ecommerceData,
  });
};

export const pushSimpleEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
};

export const mapProductToItem = (product, options = {}) => {
  const {
    quantity = 1,
    index,
    itemListId,
    itemListName,
    variant,
  } = options;

  return {
    item_id:
      product.productCode ||
      product.image?.split('/').pop()?.split('.')[0] ||
      product.name.toLowerCase().replaceAll(' ', '_'),
    item_name: product.name,
    item_brand: product.vendor || undefined,
    item_category: product.tags?.[0] || 'product',
    item_variant: variant,
    price: Number(product.price),
    quantity: Number(quantity),
    index: index !== undefined ? index + 1 : undefined,
    item_list_id: itemListId,
    item_list_name: itemListName,
  };
};
