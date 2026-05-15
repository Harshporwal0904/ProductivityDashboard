import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  HiOutlinePlus, 
  HiOutlineTrash, 
  HiOutlineSearch,
  HiOutlineBookmark,
  HiOutlinePencil
} from 'react-icons/hi';

export default function Notes() {
  const { notes, fetchNotes, createNote, updateNote, deleteNote, loading } = useData();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#6366f1');

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingNote) {
      await updateNote(editingNote._id, { title, content, color });
    } else {
      await createNote({ title, content, color });
    }
    closeModal();
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setColor(note.color);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setTitle('');
    setContent('');
    setColor('#6366f1');
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Notes</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Capture your thoughts and ideas.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <HiOutlinePlus /> Create Note
        </button>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ padding: '12px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <HiOutlineSearch style={{ color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search notes..." 
          className="input" 
          style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: 0 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Notes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredNotes.map(note => (
          <div key={note._id} className="card" style={{ 
            padding: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            borderTop: `4px solid ${note.color}`,
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', flex: 1, fontSize: '1.0625rem' }}>{note.title}</h4>
              <button 
                className="btn-icon" 
                onClick={() => updateNote(note._id, { pinned: !note.pinned })}
                style={{ color: note.pinned ? 'var(--accent-primary)' : 'var(--text-muted)' }}
              >
                <HiOutlineBookmark size={18} />
              </button>
            </div>
            
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', flex: 1 }}>
              {note.content}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
              <button className="btn-icon" onClick={() => openEdit(note)}>
                <HiOutlinePencil size={16} />
              </button>
              <button className="btn-icon" onClick={() => deleteNote(note._id)} style={{ color: 'var(--danger)' }}>
                <HiOutlineTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="card animate-fadeInScale" style={{ 
            width: '100%', 
            maxWidth: '500px', 
            padding: '32px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>
              {editingNote ? 'Edit Note' : 'Create New Note'}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>Title</label>
                <input required className="input" placeholder="Note title" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>Content</label>
                <textarea className="textarea" placeholder="Start typing..." style={{ minHeight: '150px' }} value={content} onChange={e => setContent(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '6px' }}>Color Theme</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899'].map(c => (
                    <button 
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      style={{ 
                        width: '24px', height: '24px', borderRadius: '50%', 
                        background: c, border: color === c ? '2px solid white' : 'none',
                        boxShadow: color === c ? '0 0 0 2px var(--accent-primary)' : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  {editingNote ? 'Save Changes' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
