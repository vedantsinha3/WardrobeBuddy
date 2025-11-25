import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Closet } from './pages/Closet';
import { AddClothingItem } from './pages/AddClothingItem';
import { EditClothingItem } from './pages/EditClothingItem';
import { OutfitBuilder } from './pages/OutfitBuilder';
import { OutfitLibrary } from './pages/OutfitLibrary';
import { EditOutfit } from './pages/EditOutfit';
import { WearHistory } from './pages/WearHistory';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/closet" element={<Closet />} />
          <Route path="/add-item" element={<AddClothingItem />} />
          <Route path="/edit-item/:id" element={<EditClothingItem />} />
          <Route path="/outfit-builder" element={<OutfitBuilder />} />
          <Route path="/outfits" element={<OutfitLibrary />} />
          <Route path="/edit-outfit/:id" element={<EditOutfit />} />
          <Route path="/history" element={<WearHistory />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

