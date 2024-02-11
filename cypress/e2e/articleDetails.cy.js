
describe('ArticleDetails Component', () => {
    beforeEach(() => {
      cy.visit('/articleDetails/100000009301057');
    });
  
    it('renders article details correctly when data is available', () => {
      cy.wait(2000);
      cy.get('.article_detail_main').should('exist');
      cy.get('.selectedArticle').should('have.text', '40 Years Ago, This Ad Changed the Super Bowl Forever');
      cy.get('.abstract_class').contains('An oral history of Apple’s groundbreaking “1984” spot, which helped to establish the Super Bowl as TV’s biggest commercial showcase.');
      cy.get('.img_container img').should('have.attr', 'src').and('include', 'https://static01.nyt.com/images/2024/02/09/multimedia/09apple-ad3-jwbp/09apple-ad3-jwbp-mediumThreeByTwo440.jpg');
    });
  
    it('renders empty div when selected article is not found', () => {
      // Assuming the route '/article/999' does not exist in the mock data
      cy.visit('/articleDetails/999');
      cy.get('.article_detail_main').should('not.exist');
    });
  
    // Add more test cases as needed...
  });
  