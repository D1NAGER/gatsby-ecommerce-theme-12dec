import React, { useState, useEffect, useRef } from 'react';
import * as styles from './ProductCardGrid.module.css';

import Drawer from '../Drawer';
import ProductCard from '../ProductCard';
import QuickView from '../QuickView';
import Slider from '../Slider';

import { pushToDataLayer, mapProductToItem } from '../../helpers/tracking';

const ProductCardGrid = (props) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const trackedListRef = useRef(false);

  const {
    height,
    columns = 3,
    data,
    spacing,
    showSlider = false,
    itemListId,
    itemListName,
  } = props;

  const columnCount = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  useEffect(() => {
    if (trackedListRef.current) return;
    if (!data || data.length === 0) return;
    if (!itemListId || !itemListName) return;

    pushToDataLayer('view_item_list', {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items: data.map((product, index) =>
        mapProductToItem(product, {
          index,
          itemListId,
          itemListName,
        })
      ),
    });

    trackedListRef.current = true;
  }, [data, itemListId, itemListName]);

  const renderCards = () => {
    return data.map((product, index) => {
      return (
        <ProductCard
          key={index}
          height={height}
          price={product.price}
          imageAlt={product.alt}
          name={product.name}
          image={product.image}
          meta={product.meta}
          originalPrice={product.originalPrice}
          link={product.link}
          showQuickView={() => setShowQuickView(true)}
        />
      );
    });
  };

  return (
    <div className={styles.root} style={columnCount}>
      <div
        className={`${styles.cardGrid} ${
          showSlider === false ? styles.show : ''
        }`}
        style={columnCount}
      >
        {data && renderCards()}
      </div>

      {showSlider === true && (
        <div className={styles.mobileSlider}>
          <Slider spacing={spacing}>{data && renderCards()}</Slider>
        </div>
      )}

      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView close={() => setShowQuickView(false)} />
      </Drawer>
    </div>
  );
};

export default ProductCardGrid;
