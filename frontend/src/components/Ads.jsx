import './Ads.css';


const createImageUrl = (imageUrl) => {
    console.log(imageUrl)
    let imageId = imageUrl.split("/")[5];
    if(!imageId) {
        imageId = imageUrl.split("=")[1].split("&")[0];
    }
    return `https://drive.google.com/uc?export=view&id=${imageId}`;
}

export default function Ads({ ads, className }) {
    
    return (
        
        <div className={"ads-grid " + className}>
            {ads.map((ad, index) => {
                return (
                    // <a href={`https://${ad.company.url}`} className="ad">
                    //     <div className="ad-image">
                    //         <img src={createImageUrl(ad.imageUrl)} alt="ad"/>
                    //     </div>
                    //     <div className="context">
                    //         <h3>{ad.headline}</h3>
                    //         <p>{ad.description}</p>
                    //         <p>{ad.primaryText}</p>
                    //         <p>{ad.company.name}</p>
                    //     </div>
                    // </a>


                    <div className="card">
                        <div className="card__img-container">
                            <img className="card__img" src={createImageUrl(ad.imageUrl)} alt="random unsplash" />
                        </div>
                        <div className="card__body | flow">
                            <h3 className="card__title">{ad.headline}</h3>
                            <div className="card__tags">
                                <a className="card__tag" href={ad.company.url}>{ad.company.name}</a>
                            </div>
                            <p className="card__date">{ad.primaryText}</p>
                            <p className="card__date" style={{flexGrow: true}}>
                                {ad.description}
                            </p>
                            <a className="card__cta" href={ad.company.url}>{ad.CTA}</a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}