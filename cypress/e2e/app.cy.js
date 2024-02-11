describe('App', () => {
    it('should display the article list', () => {
      cy.visit('/');
      cy.get('.App').should('be.visible');
      cy.get('.articles-list', { timeout: 4000 }).should('be.visible');
    });
  
    // Add more test cases as needed
  });