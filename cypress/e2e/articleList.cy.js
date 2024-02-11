// cypress/integration/articleList.spec.js

describe('ArticleList Component', () => {
    beforeEach(() => {
      cy.visit('/'); // Assuming the component is rendered at the root URL
    });
  
    it('should render without crashing', () => {
      cy.get('.articles-list').should('exist');
    });
  
    it('should display loading indicator when fetching articles', () => {
      cy.get('.article_lit_div').contains('Loading...').should('be.visible');
    });
  
    it('should display list of articles when loaded', () => {
      // Simulate a successful response with mock data
      cy.intercept('GET', '/api/articles', { fixture: 'articles.json' });
  
      cy.get('.article_lit_div').should('not.contain', 'Loading...');
      cy.get('.app-container').find('.MuiCard-root').should('have.length.above', 0);
    });
  });
  
// describe('ArticleList component', () => {
//     beforeEach(() => {
//       cy.visit('/'); // Assuming the component is rendered at the root URL
//     });
  
//     it('renders the component correctly', () => {
//       cy.get('.article_lit_div').should('exist');
//       cy.get('h1').should('contain.text', 'NY Times Most Popular Articles');
//       cy.get('.articles-list').should('exist');
//     });
  
//     it('displays loading indicator when articles are being fetched', () => {
//       cy.intercept('GET', 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=4YbpSgiyQnHmG5tjHvpcsaMDWLvBRh1Y', { fixture: 'articles.json' }).as('getArticles');
//       cy.get('.article_lit_div').should('contain.text', 'Loading...');
//       cy.wait('@getArticles');
//       cy.get('.article_lit_div').should('not.contain.text', 'Loading...'); // Loading indicator disappears after articles are loaded
//     });
  
//     it('handles error when articles fail to load', () => {
//       cy.intercept('GET', 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=', { statusCode: 500 }).as('getArticles');
//       cy.get('.error_div').should('contain.text', 'error');
//       cy.get('.error_div').should('not.contain.text', 'error'); // Error message disappears after loading
//     });
  
//     it('navigates to article details on card click', () => {
//       cy.intercept('GET', '/api/articles', { fixture: 'articles.json' }).as('getArticles');
//       cy.wait('@getArticles');
  
//       cy.get('.MuiCard-root').first().click();
//       cy.url().should('include', '/articleDetails'); // Assuming proper navigation is implemented
//     });
//   });
  