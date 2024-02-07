import React from "react";
import Card from "./card";


const CardBlock = ({items, title, product, grid}) => {

    const renderCards = () => (
        items ?
            items.map((item)=>(
                <Card
                   key={item._id}
                   item={item}
                   grid={grid}
                />
            ))
        :null

    )

    return(
        <div className={product ? 'card_block_shop':'card_block'}>
           <div className={product ? '':'container'}>
               {
                  title ?
                  <div className="title">{title}</div>
                  :null
               }
               <div style={{
                   display:'flex',
                   flexWrap:'wrap'
               }}>
                  { renderCards()}
               </div>
           </div>
        </div>
    )
}

export default CardBlock;