describe('AppRouter', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should navigate to ArticleList when visiting "/"', () => {
      cy.get('[data-testid="article-list"]').should('exist');
    });
  
    it('should navigate to ArticleDetails when visiting "/articleDetails/:id"', () => {
      const articleId = '100000009301057'; // Replace with a valid article ID
      cy.visit(`/articleDetails/${articleId}`);
      cy.get('[data-testid="article-details"]').should('exist');
    });
  });
  