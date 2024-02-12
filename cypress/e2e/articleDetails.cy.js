
describe('ArticleDetails Component', () => {
    beforeEach(() => {
      cy.visit('/articleDetails/100000009301057');
    });
  
    it('renders empty div when selected article is not found', () => {
      cy.visit('/articleDetails/999');
      cy.get('.article_detail_main').should('not.exist');
    });
  });
  