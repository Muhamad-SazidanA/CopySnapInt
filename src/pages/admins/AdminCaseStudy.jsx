import React, { useEffect, useState, useRef } from "react";
import { api } from "../../utils/api";
import InlinePopup from "../../components/InlinePopup";
import ConfirmModal from "../../components/ConfirmModal";
import { FaPlus, FaCheckCircle, FaTimesCircle, FaArrowRight, FaPenFancy, FaTrashAlt, FaEye, FaRocket, FaCloud } from 'react-icons/fa';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { normalizeForSave, normalizeContentHTML } from '../../utils/html';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import createDOMPurify from 'isomorphic-dompurify';

export default function AdminCaseStudy() {
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({ title: "", subtitle: "", content: "", image: "", meta_description: "", meta_keyword: "", tags: [], tagInput: '' });
    const [viewMode, setViewMode] = useState('data');
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [toggleLocked, setToggleLocked] = useState(false);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmOpts, setConfirmOpts] = useState({ title: '', message: '', onConfirm: null });
    const [previewModal, setPreviewModal] = useState(null);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try {
            const res = await api.get("/casestudys");
            const data = res.data || [];
            setItems(data);
            try {
                const params = new URLSearchParams(window.location.search);
                const saved = params.get('saved');
                const msg = params.get('msg');
                if (saved) {
                    setSuccessMsg(msg || 'Berhasil');
                    setSuccess(true);
                    try { history.replaceState(null, '', window.location.pathname); } catch (e) { }
                }
                const editId = params.get('edit');
                if (editId) {
                    const found = data.find(it => String(it.id) === String(editId));
                    if (found) {
                        setEditingId(found.id);
                        setForm({ title: found.title || '', subtitle: found.subtitle || '', content: found.content || '', image: found.image || '', meta_description: found.meta_description || '', meta_keyword: found.meta_keyword || '', tags: (found.meta_keyword || '') ? (String(found.meta_keyword).split(',').map(s => s.trim()).filter(Boolean)) : [], tagInput: '' });
                        setPreview(found.image || null);
                        setViewMode('form');
                        setTimeout(() => {
                            try {
                                if (quill && quill.clipboard) {
                                    quill.clipboard.dangerouslyPasteHTML(found.content || '');
                                    try { quill.focus(); setEditorFocused(true); } catch (e) { }
                                }
                            } catch (e) { }
                        }, 80);
                    }
                }
            } catch (e) { }
        } catch (err) { console.error("fetch casestudys", err); setItems([]); }
    };

    useEffect(() => {
        if (!file) return setPreview(form.image || null);
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file, form.image]);

    const handleFileSelect = async (e) => {
        const f = e.target.files?.[0] || null;
        if (!f) return;
        setFile(f);
        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const dataUrl = reader.result;
                const resp = await api.post('/upload', { filename: f.name, data: dataUrl });
                const url = resp.data?.url || null;
                if (url) { setForm(prev => ({ ...prev, image: url })); setPreview(url); setFile(null); }
                else setErrorMsg('Upload gagal');
            };
            reader.onerror = () => { setErrorMsg('Gagal membaca file'); setFile(null); };
            reader.readAsDataURL(f);
        } catch (err) { console.error(err); setErrorMsg('Upload gagal'); setFile(null); }
    };

    const [editorFocused, setEditorFocused] = useState(false);
    const toolbarId = 'quill-toolbar';
    const { quill, quillRef } = useQuill({
        theme: 'snow',
        placeholder: 'Deskripsi',
        modules: { toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['clean']] }
    });

    useEffect(() => {
        if (!quill) return;
        const handleTextChange = () => {
            setForm(prev => ({ ...prev, content: quill.root.innerHTML }));
        };
        quill.on('text-change', handleTextChange);
        return () => quill.off('text-change', handleTextChange);
    }, [quill]);

    // Re-apply toolbar mounting and editor styles each time form is shown to avoid layout glitches
    useEffect(() => {
        if (!quill) return;
        if (viewMode !== 'form') return;
        const timer = setTimeout(() => {
            try {
                const tbModule = quill.getModule && quill.getModule('toolbar');
                if (tbModule) {
                    const tbDom = tbModule.container;
                    const container = document.getElementById(toolbarId);
                    if (tbDom && container && container !== tbDom.parentElement) {
                        tbDom.parentElement && tbDom.parentElement.removeChild(tbDom);
                        container.appendChild(tbDom);
                    }
                }
            } catch (e) { }
            try {
                if (quill.root && quill.root.style) {
                    quill.root.style.background = '#F0F7FF';
                    quill.root.style.color = '#000000';
                    quill.root.style.padding = '18px 20px';
                    quill.root.style.borderRadius = '12px';
                    quill.root.style.minHeight = '220px';
                    quill.root.style.boxShadow = 'inset 0 0 0 2px rgba(3,119,255,0.12), 0 4px 12px rgba(3,119,255,0.06)';
                    quill.root.style.fontSize = '16px';
                    quill.root.style.lineHeight = '1.5';
                    quill.root.style.boxSizing = 'border-box';
                    quill.root.style.width = '100%';
                }
            } catch (e) { }
        }, 60);
        return () => clearTimeout(timer);
    }, [quill, viewMode]);

    // helper to upload a File object (used when handleSubmit is given a local file)
    const uploadFile = async (f) => {
        if (!f) return null;
        try {
            const reader = new FileReader();
            const dataUrl = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(new Error('Gagal membaca file'));
                reader.readAsDataURL(f);
            });
            const resp = await api.post('/upload', { filename: f.name, data: dataUrl });
            return resp.data?.url || null;
        } catch (err) {
            console.error('uploadFile error', err);
            return null;
        }
    };

    useEffect(() => {
        if (!quill) return;
        quill.clipboard.dangerouslyPasteHTML(form.content || '');
        try {
            if (quill.root && quill.root.style) {
                quill.root.style.minHeight = '220px';
                quill.root.style.maxHeight = 'none';
                quill.root.style.overflow = 'visible';
                quill.root.style.padding = '18px 20px';
                quill.root.style.boxShadow = 'inset 0 0 0 2px rgba(3,119,255,0.12), 0 4px 12px rgba(3,119,255,0.06)';
            }
        } catch (e) { }
    }, [quill, editingId]);

    // close dropdown when clicking outside
    useEffect(() => {
        const onDocClick = (e) => {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(e.target)) setOpenDropdown(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    useEffect(() => {
        if (!quill) return;
        const handleSelectionChange = (range) => setEditorFocused(!!range);
        quill.on('selection-change', handleSelectionChange);
        return () => quill.off('selection-change', handleSelectionChange);
    }, [quill]);

    useEffect(() => {
        if (!quill) return;
        try {
            const tbModule = quill.getModule && quill.getModule('toolbar');
            if (!tbModule) return;
            const tbDom = tbModule.container;
            const container = document.getElementById(toolbarId);
            if (tbDom && container && container !== tbDom.parentElement) {
                tbDom.parentElement && tbDom.parentElement.removeChild(tbDom);
                container.appendChild(tbDom);
            }
        } catch (e) { }
        try {
            if (quill.root && quill.root.style) {
                quill.root.style.background = '#F0F7FF';
                quill.root.style.color = '#000000';
                quill.root.style.padding = '12px 24px';
                quill.root.style.borderRadius = '12px';
                quill.root.style.minHeight = '220px';
                quill.root.style.boxShadow = '0 4px 12px rgba(3,119,255,0.12)';
                quill.root.style.fontSize = '16px';
                quill.root.style.lineHeight = '1.5';
                quill.root.style.boxSizing = 'border-box';
                quill.root.style.width = '100%';
            }
        } catch (e) { }
    }, [quill]);

    useEffect(() => {
        const id = 'admin-case-study-quill-styles';
        if (document.getElementById(id)) return;
        const style = document.createElement('style');
        style.id = id;
        style.innerHTML = `
            .ql-container { background: transparent !important; border: none !important; box-shadow: none !important; }
            .ql-editor { padding: 18px 20px !important; padding-bottom: 56px !important; min-height: 180px; color: #000 !important; background: transparent !important; border-radius: 12px; font-size: 16px !important; line-height: 1.5 !important; box-sizing: border-box !important; width: 100% !important; word-wrap: break-word !important; overflow-wrap: anywhere !important; word-break: break-word !important; white-space: pre-wrap !important; }
            .ql-editor p { margin: 0; }
            .ql-editor.ql-blank::before { color: #90CAF9; left: 20px; right: 20px; top: 14px; font-size: 16px; line-height: 1.25; pointer-events: none; opacity: 1; font-style: italic; }
            #${toolbarId} { position: absolute; left: 12px; bottom: 12px; z-index: 999; pointer-events: auto; display:flex; gap:12px; align-items:center; }
            #${toolbarId} .ql-toolbar { background: transparent; border: none; padding: 0; margin: 0; display:flex; align-items:center; gap:12px; }
            #${toolbarId} .ql-formats { margin-right: 0; display:flex; gap:12px; align-items:center; }
            #${toolbarId} .ql-toolbar button, #${toolbarId} .ql-toolbar .ql-stroke { color: #0377FF; }
            #${toolbarId} .ql-toolbar { display: flex; align-items: center; }
            #${toolbarId} .ql-toolbar .ql-formats { display: flex; align-items: center; gap: 8px; }
            #${toolbarId} .ql-toolbar button { height: 36px; width: 36px; display: inline-flex; align-items: center; justify-content: center; padding: 0; border-radius: 8px; line-height: 1; font-size: 16px; }
            #${toolbarId} .ql-toolbar button svg, #${toolbarId} .ql-toolbar button i, #${toolbarId} .ql-toolbar button .ql-icon { width: 16px; height: 16px; display: block; margin: 0; }
            #${toolbarId} .ql-toolbar button i, #${toolbarId} .ql-toolbar button .ql-icon { line-height: 1; }
            #${toolbarId} .ql-toolbar button .ql-stroke, #${toolbarId} .ql-toolbar button .ql-fill { vertical-align: middle; }
            #${toolbarId} .ql-toolbar button svg { transform: translateY(1); }
            #${toolbarId} .ql-toolbar button.ql-active { background: rgba(3,119,255,0.06); }
            .ql-editor ul, .ql-editor ol { padding-left: 1.25rem; margin: 0.5rem 0; }
            .ql-editor li { margin: 0.25rem 0; line-height: 1.6; }
            .ql-editor li::marker { font-size: 0.9em; vertical-align: middle; color: currentColor; }
            .ql-editor li::before, .ql-editor .ql-list-bullet::before { content: none !important; display: none !important; }
            .admin-preview-content ul, .admin-preview-content ol { padding-left: 1.25rem; margin: 0.5rem 0; }
            .admin-preview-content li { margin: 0.25rem 0; line-height: 1.6; }
            .admin-preview-content li::marker { font-size: 0.9em; vertical-align: middle; color: currentColor; }

            /* Preview / article styles - stronger rules so markers render reliably */
            .admin-preview-content ul, .admin-preview-content ol, .article-content ul, .article-content ol { padding-left: 1.25rem !important; margin: 0.5rem 0 !important; list-style-position: outside !important; }
            .admin-preview-content ul { list-style-type: disc !important; }
            .admin-preview-content ol { list-style-type: decimal !important; }
            .article-content ul { list-style-type: disc !important; }
            .article-content ol { list-style-type: decimal !important; }
            .admin-preview-content li, .article-content li { margin: 0.25rem 0 !important; line-height: 1.6 !important; display: list-item !important; }
            .admin-preview-content li::marker, .article-content li::marker { color: inherit !important; font-size: 0.9em !important; vertical-align: middle !important; }
            /* Fallback: ensure ul/ol have explicit list-style as well (for older engines) */
            .admin-preview-content ul { list-style: disc outside !important; }
            .admin-preview-content ol { list-style: decimal outside !important; }
            .article-content ul { list-style: disc outside !important; }
            .article-content ol { list-style: decimal outside !important; }
            /* handle Quill wrapping <p> inside <li> so markers remain visible */
            .admin-preview-content li > p, .article-content li > p { display: inline !important; margin: 0 !important; padding: 0 !important; }

        `;
        document.head.appendChild(style);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title) return setErrorMsg("Title required");
        setSaving(true);
        try {
            let imageUrl = form.image || null;
            if (file) {
                const uploaded = await uploadFile(file);
                if (uploaded) imageUrl = uploaded;
            }
            // convert Quill delta to deterministic HTML and sanitize
            let htmlContent = form.content || '';
            try {
                if (quill && quill.getContents) {
                    const delta = quill.getContents();
                    const ops = delta?.ops || [];
                    const converter = new QuillDeltaToHtmlConverter(ops, {});
                    htmlContent = converter.convert();
                }
            } catch (e) { }
            const DOMPurify = createDOMPurify(typeof window !== 'undefined' ? window : global);
            const safeHtml = DOMPurify.sanitize(htmlContent, { USE_PROFILES: { html: true } });

            const payload = { ...form, image: imageUrl };
            // prefer the sanitized HTML, but fall back to the editor's raw content if needed
            payload.content = normalizeForSave(safeHtml || form.content || '');
            payload.meta_description = payload.meta_description || '';
            if (form.tags && Array.isArray(form.tags)) {
                payload.meta_keyword = form.tags.join(',');
            } else {
                payload.meta_keyword = payload.meta_keyword || '';
            }
            try { console.log('DEBUG: admin sending casestudy content (delta->html->sanitized):', (payload && payload.content) ? String(payload.content).slice(0, 500) : '(no content)'); } catch (e) { }
            if (editingId) {
                await api.put(`/casestudys/${editingId}`, payload);
                setEditingId(null);
                // set message only; show popup after reload via URL param
                setSuccessMsg('Case study berhasil diperbarui!');
                setErrorMsg('');
            } else {
                // New casestudys are created as unpublished by default
                payload.published = false;
                await api.post('/casestudys', payload);
                // set message only; show popup after reload via URL param
                setSuccessMsg('Case study berhasil dibuat!');
                setErrorMsg('');
            }
            // close form, reload to data view with success indicator
            try {
                const url = new URL(window.location.href);
                url.searchParams.delete('edit');
                url.searchParams.set('saved', '1');
                // include the content type name so popup reads e.g. "Case Study — Berhasil diperbarui!"
                url.searchParams.set('msg', editingId ? 'Case Study Berhasil diperbarui!' : 'Case Study Berhasil dibuat!');
                window.location.href = url.pathname + '?' + url.searchParams.toString();
                return;
            } catch (e) {
                // redirect not available: fallback to in-place success popup and data refresh
                setViewMode('data');
                setForm({ title: "", subtitle: "", content: "", image: "", meta_description: "", meta_keyword: "", tags: [], tagInput: '' });
                setFile(null); setPreview(null);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                fetchItems();
            }
        } catch (err) { console.error('save casestudy', err); setErrorMsg('Gagal menyimpan'); }
        finally { setSaving(false); }
    };

    const handleEdit = (a) => {
        setConfirmOpts({
            title: 'Edit case study',
            message: 'Apakah Anda ingin mengedit Case Study ini?',
            variant: 'warning',
            icon: '!',
            shape: 'circle',
            onConfirm: () => {
                setConfirmOpen(false);
                try {
                    const url = new URL(window.location.href);
                    url.searchParams.set('edit', String(a.id));
                    window.location.href = url.pathname + '?' + url.searchParams.toString();
                } catch (e) {
                    window.location.href = window.location.pathname + '?edit=' + encodeURIComponent(String(a.id));
                }
            }
        });
        setConfirmOpen(true);
    };

    const handleTogglePublish = (id, current) => {
        setConfirmOpts({
            title: current ? 'Unpublish case study' : 'Publish case study',
            message: current ? 'Apakah Anda yakin ingin meng-unpublish Case Study ini?' : 'Apakah Anda yakin ingin mempublish Case Study ini?',
            variant: current ? 'info' : 'success',
            icon: current ? '✗' : '✓',
            shape: 'circle',
            onConfirm: async () => {
                try {
                    await api.put(`/casestudys/${id}`, { published: !current });
                    fetchItems();
                    setSuccessMsg(current ? 'Case study berhasil di-unpublish!' : 'Case study berhasil dipublish!');
                    setSuccess(true);
                    setErrorMsg('');
                    setTimeout(() => setSuccess(false), 3000);
                } catch (err) { console.error('toggle publish', err); setErrorMsg('Gagal mengubah status upload'); }
                finally { setConfirmOpen(false); }
            }
        });
        setConfirmOpen(true);
    };

    const handlePreview = (a) => setPreviewModal(a);
    const closePreview = () => setPreviewModal(null);

    const handleDelete = (id) => {
        setConfirmOpts({
            title: 'Hapus case study',
            message: 'Apakah Anda yakin ingin menghapus Case Study ini?',
            variant: 'danger',
            icon: '✗',
            shape: 'square',
            onConfirm: async () => {
                try { await api.delete(`/casestudys/${id}`); fetchItems(); setSuccessMsg('Case Study berhasil dihapus!'); setSuccess(true); setErrorMsg(''); setTimeout(() => setSuccess(false), 3000); }
                catch (err) { console.error('delete casestudy', err); setErrorMsg('Gagal menghapus'); }
                finally { setConfirmOpen(false); }
            }
        });
        setConfirmOpen(true);
    };

    const confirmLeaveForm = () => {
        setConfirmOpts({
            title: 'Tinggalkan form',
            message: 'Apakah Anda yakin ingin meninggalkan form? Perubahan yang belum disimpan akan hilang.',
            variant: 'warning',
            icon: '!',
            onConfirm: () => {
                setConfirmOpen(false);
                try { window.location.href = window.location.pathname; } catch (e) { window.location.reload(); }
            }
        });
        setConfirmOpen(true);
    };

    const leaveOrDo = (action) => {
        if (viewMode === 'form') {
            setConfirmOpts({
                title: 'Tinggalkan form',
                message: 'Apakah Anda yakin ingin meninggalkan form? Perubahan yang belum disimpan akan hilang.',
                variant: 'warning',
                icon: '!',
                onConfirm: () => { setConfirmOpen(false); try { window.location.href = window.location.pathname; } catch (e) { window.location.reload(); } }
            });
            setConfirmOpen(true);
        } else {
            try { action && action(); } catch (e) { }
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#0377FF]">Admin — Case Study</h1>
                <div className="flex items-center gap-3">
                    <div className="relative inline-block" ref={dropdownRef}>
                        <button type="button" onClick={() => { if (toggleLocked) return; setOpenDropdown(o => !o); }} className="inline-flex items-center gap-2 bg-[#F0F7FF] border-2 border-[#E3F2FD] rounded-xl px-4 py-2 text-sm text-[#0377FF] shadow-[0_4px_12px_0_rgba(3,119,255,0.06)] focus:outline-none focus:border-[#2196F3] transition-colors w-44 justify-between">
                            <span className="truncate">{viewMode === 'form' ? 'Form Case Study' : 'Data Case Study'}</span>
                            <svg className={`w-4 h-4 transition-transform ${openDropdown ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="#0377FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>

                        {openDropdown && (
                            <div className="absolute right-0 mt-2 w-full bg-white border-2 border-[#E3F2FD] rounded-xl shadow-lg z-50 overflow-hidden">
                                <button type="button" onClick={() => {
                                    if (toggleLocked) return;
                                    setToggleLocked(true); setTimeout(() => setToggleLocked(false), 320);
                                    setViewMode('form'); setOpenDropdown(false); setForm({ title: "", subtitle: "", content: "", image: "", meta_description: "", meta_keyword: "", tags: [], tagInput: '' }); setPreview(null); setFile(null); setEditingId(null);
                                    setTimeout(() => { try { if (quill && quill.getContents && quill.setContents) { const c = quill.getContents(); quill.setContents(c); } try { quill && quill.focus && quill.focus(); } catch (e) { } } catch (e) { } }, 90);
                                }} className="w-full text-left px-4 py-2 text-[#0377FF] hover:bg-[#F0F7FF]">Form Case Study</button>
                                <button type="button" onClick={() => {
                                    if (toggleLocked) return;
                                    setToggleLocked(true); setTimeout(() => setToggleLocked(false), 320);
                                    leaveOrDo(() => { setViewMode('data'); setOpenDropdown(false); setTimeout(() => { try { quill && quill.update && quill.update(); } catch (e) { } }, 90); });
                                }} className="w-full text-left px-4 py-2 text-[#0377FF] hover:bg-[#F0F7FF]">Data Case Study</button>
                            </div>
                        )}
                    </div>

                    <button
                        title={viewMode === 'form' ? 'Kembali' : 'Tambah case study'}
                        onClick={() => {
                            if (toggleLocked) return;
                            setToggleLocked(true); setTimeout(() => setToggleLocked(false), 320);
                            if (viewMode === 'form') {
                                leaveOrDo(() => { setViewMode('data'); setTimeout(() => { try { quill && quill.update && quill.update(); } catch (e) { } }, 90); });
                            } else {
                                setViewMode('form');
                                setForm({ title: "", subtitle: "", content: "", image: "", meta_description: "", meta_keyword: "", tags: [], tagInput: '' });
                                setPreview(null);
                                setFile(null);
                                setEditingId(null);
                                setTimeout(() => { try { if (quill && quill.getContents && quill.setContents) { const c = quill.getContents(); quill.setContents(c); } try { quill && quill.focus && quill.focus(); } catch (e) { } } catch (e) { } }, 90);
                            }
                        }}
                        className={`${viewMode === 'form' ? 'inline-flex items-center gap-2 bg-white text-[#0377FF] border border-gray-200 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-50' : 'inline-flex items-center gap-2 bg-[#0377FF] text-white px-3 py-2 rounded-lg shadow hover:bg-blue-600'} w-44 justify-center`}
                    >
                        {viewMode === 'form' ? <><span className="font-medium">Kembali</span><FaArrowRight className="ml-2" /></> : <><FaPlus /><span className="font-medium">Tambah</span></>}
                    </button>
                </div>
            </div>

            {viewMode === 'form' && (
                <form onSubmit={handleSubmit} className="bg-white border border-blue-200/50 rounded-2xl shadow-lg p-8 md:p-10 max-w-3xl mx-auto mb-8" style={{ boxShadow: '0 8px 32px rgba(33, 150, 243, 0.12)' }}>
                    {/* Image */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <div className="flex items-center gap-4 mb-3">
                        <label className="inline-flex items-center gap-3 bg-[#F0F7FF] border-2 border-[#E3F2FD] rounded-xl px-4 py-2 text-[#2196F3] cursor-pointer shadow-[0_4px_12px_0_rgba(3,119,255,0.06)]">
                            <span className="font-medium">Pilih gambar</span>
                            <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                        </label>
                        <div className="text-sm text-[#0377FF]">akan otomatis ter-upload</div>
                    </div>
                    {preview && <img src={preview} alt="preview" className="mt-0 mb-3 w-48 h-32 object-cover rounded" />}

                    {/* Title */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                    <input
                        name="title"
                        placeholder="Judul"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-[#F0F7FF] border-2 rounded-xl px-6 py-3 text-black placeholder-[#90CAF9] focus:outline-none focus:border-[#2196F3] transition-all shadow-[0_4px_12px_0_rgba(3,119,255,0.12)] border-[#E3F2FD] mb-3"
                    />

                    {/* Subtitle */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subjudul</label>
                    <input
                        name="subtitle"
                        placeholder="Subjudul"
                        value={form.subtitle}
                        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                        className="w-full bg-[#F0F7FF] border-2 rounded-xl px-6 py-3 text-black placeholder-[#90CAF9] focus:outline-none focus:border-[#2196F3] transition-all shadow-[0_4px_12px_0_rgba(3,119,255,0.12)] border-[#E3F2FD] mb-3"
                    />

                    {/* Content */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <div className="w-full mb-3">
                        <div
                            className={`w-full bg-[#F0F7FF] border-2 rounded-xl  text-[#2196F3] placeholder-[#90CAF9] transition-all shadow-[0_4px_12px_0_rgba(3,119,255,0.12)] mb-3 relative ${editorFocused ? 'border-[#2196F3] ring-2 ring-[#2196F3]/30' : 'border-[#E3F2FD]'}`}
                            onClick={() => { if (quill) { try { quill.focus(); } catch (e) { } setEditorFocused(true); } }}
                        >
                            <div ref={quillRef} />
                            <div id={toolbarId} className={`absolute left-2 bottom-2 z-20 transition-opacity duration-150 ${editorFocused ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
                        </div>
                    </div>

                    {/* Meta Description */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Deskripsi</label>
                    <input
                        name="meta_description"
                        placeholder="Meta deskripsi"
                        value={form.meta_description}
                        onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                        className="w-full bg-[#F0F7FF] border-2 rounded-xl px-6 py-3 text-black placeholder-[#90CAF9] focus:outline-none focus:border-[#2196F3] transition-all shadow-[0_4px_12px_0_rgba(3,119,255,0.12)] border-[#E3F2FD] mb-3"
                    />

                    {/* Meta Keyword */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keyword</label>
                    <div className="w-full bg-[#F0F7FF] border-2 rounded-xl px-4 py-3 text-black placeholder-[#90CAF9] focus-within:border-[#2196F3] transition-all shadow-[0_4px_12px_0_rgba(3,119,255,0.12)] border-[#E3F2FD] mb-4">
                        <div className="flex flex-wrap gap-2">
                            {form.tags && form.tags.map((t, idx) => (
                                <span key={idx} className="inline-flex items-center gap-2 bg-white text-sm text-gray-800 px-2 py-1 rounded-full shadow">
                                    <span className="truncate max-w-xs">{t}</span>
                                    <button type="button" onClick={() => { setForm(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== idx) })); }} className="text-gray-500 hover:text-gray-700 focus:outline-none">×</button>
                                </span>
                            ))}
                            <input
                                value={form.tagInput}
                                onChange={(e) => setForm(prev => ({ ...prev, tagInput: e.target.value }))}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ',') {
                                        e.preventDefault();
                                        const raw = (form.tagInput || '').trim();
                                        if (!raw) return;
                                        const parts = raw.split(',').map(s => s.trim()).filter(Boolean);
                                        const dedup = Array.from(new Set([...(form.tags || []), ...parts]));
                                        setForm(prev => ({ ...prev, tags: dedup, tagInput: '' }));
                                    }
                                    if (e.key === 'Backspace' && !form.tagInput && form.tags && form.tags.length) {
                                        setForm(prev => ({ ...prev, tags: prev.tags.slice(0, -1) }));
                                    }
                                }}
                                placeholder="Tambah tag dan tekan Enter"
                                className="flex-1 bg-transparent outline-none text-black placeholder-[#90CAF9] p-0 m-0 min-w-[120px]"
                            />
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Tekan Enter atau koma untuk menambah tag. Pisahkan banyak tag dengan Enter.</div>
                    </div>

                    <div className="mt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#0377FF] hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-base shadow-[0_4px_12px_0_rgba(3,119,255,0.12)] transition-colors duration-200">{saving ? 'Menyimpan...' : 'Simpan'}</button>
                    </div>
                </form>
            )}

            {viewMode === 'data' && (
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                        {items.map((a) => (
                            <div key={a.id} className="bg-white rounded-xl p-4 shadow relative pb-4">
                                <div className={`absolute right-3 top-3`}>
                                    <div className={`text-xs font-semibold px-2 py-1 rounded ${a.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {a.published ? <><FaCheckCircle className="w-4 h-4 inline-block align-middle mr-1" /> Sudah di upload</> : <><FaTimesCircle className="w-4 h-4 inline-block align-middle mr-1" /> Belum di upload</>}
                                    </div>
                                </div>
                                <div className="flex gap-4 items-stretch">
                                    <div className="flex-shrink-0 w-80 bg-gray-100 rounded overflow-hidden">
                                        {a.image ? <img src={a.image} alt={a.title} className="block w-full h-auto object-contain object-center" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg">{a.title}</h3>
                                            <p className="text-sm text-gray-500">{a.subtitle}</p>
                                        </div>

                                        <div className="flex items-center justify-between gap-3 mt-2">
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => handleEdit(a)} className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white shadow hover:brightness-95" title="Edit" aria-label="Edit">
                                                    <FaPenFancy className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleDelete(a.id)} className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white shadow hover:brightness-95" title="Hapus" aria-label="Hapus">
                                                    <FaTrashAlt className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handlePreview(a)} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow hover:brightness-95" title="Preview" aria-label="Preview">
                                                    <FaEye className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div>
                                                <button onClick={() => handleTogglePublish(a.id, !!a.published)} className={`flex items-center justify-center w-10 h-10 rounded-full text-white shadow ${a.published ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700'}`} title={a.published ? 'Unpublish' : 'Publish'} aria-label={a.published ? 'Unpublish' : 'Publish'}>
                                                    {a.published ? <FaCloud className="w-5 h-5" /> : <FaRocket className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        {editingId === a.id && <div className="absolute right-3 top-12 text-sm text-green-600">(Editing)</div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {previewModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-5xl p-4 md:p-6 relative overflow-auto max-h-[85vh]">
                        <button type="button" onClick={closePreview} aria-label="Tutup preview" title="Tutup" className="absolute right-3 top-3 bg-white border border-gray-200 p-2 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0377FF] z-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="max-w-7xl mx-auto">
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-center p-4 md:p-8">
                                    <img src={previewModal.image || '/images/DummyContent.svg'} alt={previewModal.title} className="w-full max-w-3xl h-auto rounded-lg object-cover" />
                                </div>
                                <div className="text-black p-4 md:p-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-black leading-snug mb-2">{previewModal.title}</h2>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                                        <div className="text-[#0B2447] font-medium">{previewModal.published_at || previewModal.createdAt ? `Published: ${new Date(previewModal.published_at || previewModal.createdAt).toLocaleDateString()}` : ''}</div>
                                    </div>
                                    {previewModal.subtitle && <div className="text-xl md:text-2xl font-semibold text-black mb-4">{previewModal.subtitle}</div>}
                                    <div className="text-base md:text-lg font-normal text-black leading-relaxed w-full max-w-none text-justify break-words whitespace-pre-wrap article-content" dangerouslySetInnerHTML={{ __html: normalizeContentHTML(previewModal.content || '') }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <InlinePopup success={success} setSuccess={setSuccess} errorMsg={errorMsg} setErrorMsg={setErrorMsg} successMessage={successMsg} />
            <ConfirmModal open={confirmOpen} title={confirmOpts.title} message={confirmOpts.message} onConfirm={confirmOpts.onConfirm} onCancel={() => setConfirmOpen(false)} variant={confirmOpts.variant} icon={confirmOpts.icon} shape={confirmOpts.shape} />
        </div>
    );
}