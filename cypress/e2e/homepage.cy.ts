describe('template spec', () => {
  it('Should visit homepage and see table', () => {
    cy.visit('http://localhost:4200/cars');

    // Check if the table has at least 3 rows
    cy.get('table').find('tr').should('have.length.gte', 3);

    // Click on the second row
    cy.get('table').find('tr').eq(1).click();

    cy.wait(2000);

    // Verify that the URL has changed
    cy.url().should('include', '/cars/1');

    // Verify that the new page has an image
    cy.get('mat-card').should('be.visible');

    cy.end()
  })
})
