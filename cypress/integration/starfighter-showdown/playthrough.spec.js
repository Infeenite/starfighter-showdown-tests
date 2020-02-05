describe('Starfighter Showdown - Playthrough', () => {
    before(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.visit('https://infeenite.github.io/');
 
    });

    it('should display the rules', () => {
        cy.get('#cy-rules').should('exist');
    });

    it('should start the game', () => {
        cy.get('#cy-begin').click({force: true});
        cy.get('#cy-waiting-for-player-one').should('exist');
    });

    it('should play the match and display the results', () => {
        for(let i = 0; i < 5; i++) {
            cy.get('#cy-waiting-for-player-one').should('exist');
            cy.get('#cy-next-round').should('be.disabled');
            cy.wait(1000);
            cy.get('#cy-deck').first().find('app-starfighter-card').eq(Math.floor(Math.random() * 9)).click({force: true});
            cy.get('#cy-waiting-for-player-one').should('exist');
            cy.get('#cy-next-round').should('be.disabled');
            cy.wait(1000);
            cy.get('#cy-deck').first().find('app-starfighter-card').eq(Math.floor(Math.random() * 9)).click({force: true});
            cy.wait(2000); // Aesthetical purposes, wait until winner will be announced
            cy.get('#cy-next-round').click({force: true});
        }
        cy.get('mat-table').should('exist');
    });

    it('should navigate back to main page', () => {
        cy.get('#cy-restart').click({force: true});
    })
})
