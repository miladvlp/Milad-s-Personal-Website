import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!itemRef.current) return;
        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;
        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    }

    const handleMouseLeave = () => {
        setTransformStyle('');
    }

    return (
        <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform: transformStyle }}>
            {children}
        </div>
    )
}

const ProjectCard = ({ item, onClick }) => {
    return (
        <BentoTilt className="relative border-hsla overflow-hidden rounded-md transition-transform duration-300 ease-out h-96 w-full cursor-pointer group">
            <div onClick={() => onClick(item)} className="size-full relative">
                <img src={item.image} alt={item.title} className="absolute left-0 top-0 size-full object-cover object-center transition-transform duration-500 group-hover:scale-110" />
                <div className="relative z-10 flex size-full flex-col justify-end p-5 text-blue-50 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <h1 className="bento-title special-font text-3xl">{item.title}</h1>
                    <p className="mt-2 text-sm font-circular-web opacity-80">{item.shortDescription}</p>
                </div>
            </div>
        </BentoTilt>
    )
}

const Projects = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, articlesRes] = await Promise.all([
                    fetch('/data/projects.json'),
                    fetch('/data/articles.json')
                ]);

                const projectsData = await projectsRes.json();
                const articlesData = await articlesRes.json();

                setProjects(projectsData);
                setArticles(articlesData);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const data = activeTab === 'projects' ? projects : articles;

    const handleCardClick = (item) => {
        if (item.category === 'articles') {
            navigate(`/article/${item.id}`);
        } else {
            navigate(`/project/${item.id}`);
        }
    }

    return (
        <section className="bg-black min-h-screen pt-32 px-5 md:px-10 pb-10 w-screen overflow-x-hidden">
            <div className="flex justify-center gap-5 md:gap-10 mb-16 flex-wrap">
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`text-2xl md:text-6xl font-zentry uppercase transition-colors duration-300 ${activeTab === 'projects' ? 'text-blue-50' : 'text-blue-50/40 hover:text-blue-50/70'}`}
                >
                    Projects
                </button>
                <button
                    onClick={() => setActiveTab('articles')}
                    className={`text-2xl md:text-6xl font-zentry uppercase transition-colors duration-300 ${activeTab === 'articles' ? 'text-blue-50' : 'text-blue-50/40 hover:text-blue-50/70'}`}
                >
                    Articles
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {loading ? (
                    <p className="text-blue-50/70 col-span-full text-center">Loading...</p>
                ) : data.length > 0 ? (
                    data.map(item => (
                        <ProjectCard key={item.id} item={item} onClick={handleCardClick} />
                    ))
                ) : (
                    <p className="text-blue-50/70 col-span-full text-center">No items found</p>
                )}
            </div>
        </section>
    )
}

export default Projects;
