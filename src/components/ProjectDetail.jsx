import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

const ContentBlock = ({ block }) => {
    switch (block.type) {
        case 'heading':
            return (
                <h2 className="text-3xl font-zentry text-blue-50 mb-6 mt-8">
                    {block.value}
                </h2>
            );
        case 'text':
            return (
                <div className="text-blue-50/80 font-circular-web text-lg leading-relaxed whitespace-pre-wrap mb-6">
                    {block.value}
                </div>
            );
        case 'image':
            return (
                <BentoTilt className="relative border-hsla overflow-hidden rounded-xl w-full my-8">
                    <img
                        src={block.value}
                        alt={block.alt || 'Project image'}
                        className="w-full h-auto object-cover object-center"
                    />
                    {block.caption && (
                        <p className="text-blue-50/60 text-sm font-circular-web mt-2 text-center italic">
                            {block.caption}
                        </p>
                    )}
                </BentoTilt>
            );
        case 'gif':
            return (
                <BentoTilt className="relative border-hsla overflow-hidden rounded-xl w-full my-8">
                    <img
                        src={block.value}
                        alt={block.alt || 'Project GIF'}
                        className="w-full h-auto object-cover object-center"
                    />
                    {block.caption && (
                        <p className="text-blue-50/60 text-sm font-circular-web mt-2 text-center italic">
                            {block.caption}
                        </p>
                    )}
                </BentoTilt>
            );
        case 'code':
            return (
                <div className="my-6 rounded-xl overflow-hidden border border-white/10">
                    <SyntaxHighlighter
                        language={block.language || 'javascript'}
                        style={vscDarkPlus}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            fontSize: '0.95rem',
                            background: '#1e1e1e'
                        }}
                    >
                        {block.value}
                    </SyntaxHighlighter>
                </div>
            );
        default:
            return null;
    }
};

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch('/data/projects.json');
                const projectsData = await response.json();
                const foundProject = projectsData.find(p => p.id === parseInt(id));
                setProject(foundProject);
            } catch (error) {
                console.error('Error loading project:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <section className="bg-black min-h-screen pt-32 px-5 md:px-10 pb-10 w-screen overflow-x-hidden flex items-center justify-center">
                <p className="text-blue-50/70">Loading...</p>
            </section>
        );
    }

    if (!project) {
        return (
            <section className="bg-black min-h-screen pt-32 px-5 md:px-10 pb-10 w-screen overflow-x-hidden flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-zentry text-blue-50 mb-4">Project Not Found</h1>
                    <button
                        onClick={() => navigate('/projects')}
                        className="mt-8 px-8 py-3 bg-blue-50 text-black rounded-lg font-circular-web font-bold hover:bg-blue-100 transition-colors"
                    >
                        Back to Projects
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-black min-h-screen pt-32 px-5 md:px-10 pb-10 w-screen overflow-x-hidden">
            <button
                onClick={() => navigate('/projects')}
                className="flex items-center gap-2 text-blue-50 hover:text-blue-100 transition-colors mb-8 text-lg group"
            >
                <IoMdArrowBack className="text-2xl group-hover:-translate-x-1 transition-transform" />
                <span className="font-circular-web">Back to Projects</span>
            </button>

            <div className="max-w-6xl mx-auto">
                {/* Hero Image */}
                <BentoTilt className="relative border-hsla overflow-hidden rounded-2xl h-96 md:h-[500px] w-full mb-12">
                    <img src={project.image} alt={project.title} className="size-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </BentoTilt>

                {/* Title and Meta */}
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-zentry text-blue-50 mb-4 uppercase leading-none">{project.title}</h1>
                    <div className="flex flex-wrap gap-6 text-blue-50/70 font-circular-web text-lg">
                        <div>
                            <p className="text-blue-50/50 text-sm mb-1">Status</p>
                            <p className="font-semibold">{project.status}</p>
                        </div>
                        <div>
                            <p className="text-blue-50/50 text-sm mb-1">Category</p>
                            <p className="font-semibold capitalize">{project.category}</p>
                        </div>
                        <div>
                            <p className="text-blue-50/50 text-sm mb-1">Generate</p>
                            <p className="font-semibold capitalize">{project.generate}</p>
                        </div>
                    </div>
                </div>

                {/* Dynamic Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-3xl font-zentry text-blue-50 mb-6">Overview</h2>
                            <div className="text-blue-50/80 font-circular-web text-lg leading-relaxed mb-4">
                                {project.description}
                            </div>

                            {/* Render dynamic content blocks */}
                            {project.content && project.content.map((block, index) => (
                                <ContentBlock key={index} block={block} />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Tech Stack */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 sticky top-32">
                            <h3 className="text-xl font-zentry text-blue-50 mb-4 uppercase">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-blue-50/10 border border-blue-50/20 rounded-full text-blue-50/80 font-circular-web text-sm hover:bg-blue-50/20 transition-colors cursor-pointer">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Resources */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-zentry text-blue-50 mb-4 uppercase">Project Resources</h3>
                            <div className="space-y-4">
                                {/* Download Link */}
                                {project.downloadLink && (
                                    <div>
                                        <p className="text-blue-50/50 text-sm font-circular-web mb-1">Download</p>
                                        <a
                                            href={project.downloadLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-100 underline font-circular-web hover:text-white transition-colors break-all"
                                        >
                                            {project.downloadLink}
                                        </a>
                                    </div>
                                )}

                                {/* GitHub Repository */}
                                {project.githubRepo && (
                                    <div>
                                        <p className="text-blue-50/50 text-sm font-circular-web mb-1">GitHub Repository</p>
                                        <a
                                            href={project.githubRepo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-100 underline font-circular-web hover:text-white transition-colors break-all"
                                        >
                                            {project.githubRepo}
                                        </a>
                                    </div>
                                )}

                                {/* Live Demo */}
                                {project.liveDemo && (
                                    <div>
                                        <p className="text-blue-50/50 text-sm font-circular-web mb-1">Live Demo</p>
                                        <a
                                            href={project.liveDemo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-100 underline font-circular-web hover:text-white transition-colors break-all"
                                        >
                                            {project.liveDemo}
                                        </a>
                                    </div>
                                )}
                                {project.linkVideo && (
                                    <div>
                                        <p className="text-blue-50/50 text-sm font-circular-web mb-1">Live Demo</p>
                                        <a
                                            href={project.linkVideo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-100 underline font-circular-web hover:text-white transition-colors break-all"
                                        >
                                            {project.linkVideo}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetail;
