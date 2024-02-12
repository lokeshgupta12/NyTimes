describe('ArticleList Component', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should render without crashing', () => {
      cy.get('.articles-list').should('exist');
    });
  
    it('should display loading indicator when fetching articles', () => {
      cy.get('.article_lit_div').contains('Loading...').should('be.visible');
    });
  
    it('should display list of articles when loaded', () => {
      cy.intercept('GET', '/api/articles', { fixture: 'articles.json' });
  
      cy.get('.article_lit_div').should('not.contain', 'Loading...');
      cy.get('.app-container').find('.MuiCard-root').should('have.length.above', 0);
    });
  });
