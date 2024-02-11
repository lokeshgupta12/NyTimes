import { useParams } from 'react-router-dom';
import { useListData } from '../../utils/context';
import useNYTArticles from '../../utils/customHooks/useNYTArticles';
import constant from '../../constants';

function ArticleDetails() {
  const { listData } = useListData();
  const { id } = useParams();
  if (!listData.length) {
    useNYTArticles();
  }
  const selectedArticle = listData.filter((article) => article.id === Number(id))[0];
  if (!selectedArticle) {
    return <div />;
  }
  return (
    <div className="article_detail_main" data-testid="article-details">
      <div className="app-container">
        <h4>{constant.SELECTED_ARTICLE_TEXT}</h4>
        <h5 className="selectedArticle">{selectedArticle?.title}</h5>
      </div>
      <div>
        <p className="app-container abstract_class">{selectedArticle?.abstract}</p>
        <div className="app-container">
          <div className="img_container">
            <h4>
              {constant.CAPTION_TEXT}
              {selectedArticle?.media && selectedArticle?.media[0]?.caption}
            </h4>
            <img
              src={
                selectedArticle?.media &&
                selectedArticle?.media[0] &&
                selectedArticle?.media[0]['media-metadata'][2]?.url
                  ? selectedArticle?.media[0]['media-metadata'][2]?.url
                  : 'https://via.placeholder.com/140'
              }
              alt="imgData"
            />
          </div>
        </div>
        <p className="app-container by_container">
          {selectedArticle?.byline} | {constant.PUBLISHED_TEXT}{' '}
          {new Date(selectedArticle?.published_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default ArticleDetails;
