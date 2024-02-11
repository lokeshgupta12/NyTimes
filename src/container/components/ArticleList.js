// src/ArticleList.js
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import useNYTArticles from '../../utils/customHooks/useNYTArticles';
import Each from '../presentational/Each';
import constant from '../../constants';

function Loader() {
  return (
    <div className="article_lit_div">
      Loading...
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </div>
  );
} // Define a simple Loader component

function ArticleList() {
  const { articles, loading, error } = useNYTArticles();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/articleDetails/${id}`);
  };

  return (
    <>
      <div className="div_center">
        <h1>{constant.APP_HEADING}</h1>
      </div>
      {error && (
        <div className="error_div">
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{constant.API_ERROR}</Alert>
          </Stack>
        </div>
      )}
      <div className="app-container" data-testid="article-list">
        <div className="articles-list">
          <h2 className="div_center">{constant.ARTICLE_TITLE}</h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="article_lit_div">
              <Each
                items={articles}
                keyValue="list"
                render={(article) => (
                  <Card sx={{ maxWidth: 345 }} onClick={() => handleClick(article.id)}>
                    <CardActionArea>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={
                          article.media[0] &&
                          article.media[0]['media-metadata'] &&
                          article.media[0]['media-metadata'][1] &&
                          article.media[0]['media-metadata'][1].url
                            ? article.media[0]['media-metadata'][1].url
                            : constant.DEFAULT_IMG_URL
                        }
                        title={article.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {article.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {article.abstract}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ArticleList;
