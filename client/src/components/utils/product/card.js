import React from "react";
import { renderCardImage, PijarButton } from "../tools";
const Card = (props) => {

    // const handleAddToCart = () => {
    //     alert('add to cart')
    // }

  return (
    <div className={`card_item_wrapper ${props.grid ? "grid_bars" : ""}`}>
      <div
        className="image"
        style={{
          background: `url(${renderCardImage(props.item.images)})`,
        }}
      ></div>
      <div className="action_container">
        <div className="tags">
          <div className="name">{props.item.name}</div>
        </div>

        {props.grid ? (
          <div className="description">
            <p>{props.item.description}</p>
          </div>
        ) : null}
        <div className="actions">
          {/* <div className="button_wrapp">
            <PijarButton
              type="default"
              altClass="card_link"
              title="View product"
              linkTo={"/"}
              style={{
                fontWeight: "bold",
              }}
            />
          </div>
          <div className="button_wrapp">
            <PijarButton
              type="bag_link"
              runAction={ ()=> handleAddToCart(props.item)}
              iconSize="23"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
