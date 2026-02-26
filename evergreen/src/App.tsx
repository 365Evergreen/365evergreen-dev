import './App.css'
import { Footer, Header } from './components'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from './pages/home'

export function App() {
  return (
    <main className="app">
      <section className="app__content">
        <AppLayout
          header={<Header />}
          footer={<Footer />}
        >
          <HomePage />
        </AppLayout>
      </section>
    </main>
  )
}
