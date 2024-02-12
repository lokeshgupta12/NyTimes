describe('AppRouter', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should navigate to ArticleList when visiting "/"', () => {
      cy.get('[data-testid="article-list"]').should('exist');
    });
  });
  