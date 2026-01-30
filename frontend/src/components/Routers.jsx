import About from './components/About';
import Contact from './components/Contact';
import Stock from './components/Stock';
import Admindashboard from './components/Admindashboard';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/stock" element={<Stock />} />
  <Route path="/Admindashboard" element={<Admindashboard/>}/>
</Routes>
