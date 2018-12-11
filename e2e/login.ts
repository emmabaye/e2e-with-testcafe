import {Selector, ClientFunction} from 'testcafe';
import admin from '../user';

fixture `Login`
    .page `https://events-manager-abaye.herokuapp.com/login`;

test('Load login Page', async t => {
    await t
        .expect(Selector('form').exists).ok()
        .expect(Selector('form input[name=email]').exists).ok()
        .expect(Selector('form input[name=password]').exists).ok()
        .expect(Selector('form button[type=submit]').exists).ok()
        .click("a[href='/signup']")
        .wait(1000);

        const windowURL: string = await (ClientFunction(() => window.location.href))();
    await t
        .expect(windowURL == 'https://events-manager-abaye.herokuapp.com/signup').ok()

});

test('Login Admin', async t => {
    await t
        .navigateTo('/login')
        .wait(1000)
        .typeText('input[name=email]', admin.email)
        .typeText('input[name=password]', admin.password)
        .click('form button[type=submit]')
        .wait(1000)

        const windowURL: string = await (ClientFunction(() => window.location.href))();
        await t
            .expect(windowURL == 'https://events-manager-abaye.herokuapp.com/myevents').ok()
            .click(".navbar a[href='/admin']")
            .wait(500)
});
