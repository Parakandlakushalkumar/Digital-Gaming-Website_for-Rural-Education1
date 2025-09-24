import React, { useState, useEffect, useRef } from 'react';

const SetsRelationsFunctionsGames = () => {
  // Game state
  const [scores, setScores] = useState({
    set: 0,
    venn: 0,
    relation: 0,
    function: 0,
    quiz: 0
  });
  
  const [activeGame, setActiveGame] = useState(null);
  const [currentSetRound, setCurrentSetRound] = useState(0);
  const [currentVennProblem, setCurrentVennProblem] = useState({});
  const [currentRelations, setCurrentRelations] = useState([]);
  const [selectedRelationItem, setSelectedRelationItem] = useState(null);
  const [currentFunction, setCurrentFunction] = useState({});
  const [functionTests, setFunctionTests] = useState([]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [functionInput, setFunctionInput] = useState('');
  const [functionOutput, setFunctionOutput] = useState('');
  const [functionGuess, setFunctionGuess] = useState('');
  const [currentRelationProblem, setCurrentRelationProblem] = useState(null);
  
  const canvasRef = useRef(null);

  // Game data
  const setSorterData = [
    {
      objects: ['🍎', '🍌', '🐶', '🐱', '🟦', '🟨', '⭐', '⚽'],
      sets: [
        { name: 'Fruits 🍎', items: ['🍎', '🍌'] },
        { name: 'Animals 🐶', items: ['🐶', '🐱'] },
        { name: 'Shapes 🟦', items: ['🟦', '🟨', '⭐'] },
        { name: 'Sports ⚽', items: ['⚽'] }
      ]
    },
    {
      objects: ['🌹', '🌻', '🚗', '🚁', '📚', '✏️', '🎵', '🎨'],
      sets: [
        { name: 'Flowers 🌹', items: ['🌹', '🌻'] },
        { name: 'Vehicles 🚗', items: ['🚗', '🚁'] },
        { name: 'School Items 📚', items: ['📚', '✏️'] },
        { name: 'Arts 🎨', items: ['🎵', '🎨'] }
      ]
    }
  ];

  const vennProblems = [
    {
      setA: { name: 'Pets', label: 'Pets' },
      setB: { name: 'Animals', label: 'Animals' },
      items: [
        { name: '🐶 Dog', belongs: 'both' },
        { name: '🐱 Cat', belongs: 'both' },
        { name: '🦁 Lion', belongs: 'b' },
        { name: '🐧 Penguin', belongs: 'b' },
        { name: '🌹 Rose', belongs: 'none' }
      ]
    },
    {
      setA: { name: 'Round Objects', label: 'Round' },
      setB: { name: 'Red Objects', label: 'Red' },
      items: [
        { name: '⚽ Soccer Ball', belongs: 'both' },
        { name: '🍎 Apple', belongs: 'both' },
        { name: '🟦 Blue Square', belongs: 'none' },
        { name: '🔴 Red Circle', belongs: 'both' },
        { name: '🟨 Yellow Circle', belongs: 'a' }
      ]
    }
  ];

  const relationProblems = [
    {
      setA: { name: 'Students', items: ['Rahul', 'Priya', 'Sam'] },
      setB: { name: 'Subjects', items: ['Math', 'Science', 'Art'] },
      targetRelations: [
        { from: 'Rahul', to: 'Math' },
        { from: 'Priya', to: 'Science' },
        { from: 'Sam', to: 'Art' }
      ]
    },
    {
      setA: { name: 'Countries', items: ['India', 'USA', 'Japan'] },
      setB: { name: 'Capitals', items: ['Delhi', 'Washington', 'Tokyo'] },
      targetRelations: [
        { from: 'India', to: 'Delhi' },
        { from: 'USA', to: 'Washington' },
        { from: 'Japan', to: 'Tokyo' }
      ]
    }
  ];

  const functionTypes = [
    { rule: 'f(x) = 2x + 1', func: x => 2 * x + 1, description: '2x + 1' },
    { rule: 'f(x) = x²', func: x => x * x, description: 'x²' },
    { rule: 'f(x) = 3x - 2', func: x => 3 * x - 2, description: '3x - 2' },
    { rule: 'f(x) = x + 5', func: x => x + 5, description: 'x + 5' },
    { rule: 'f(x) = 2x', func: x => 2 * x, description: '2x' }
  ];

  const quizQuestionsData = [
    {
      mapping: "A = {1, 2, 3}\nB = {a, b, c}\n\n1 → a\n2 → b\n3 → c",
      isFunction: true,
      explanation: "Each input has exactly one output."
    },
    {
      mapping: "A = {1, 2, 3}\nB = {x, y}\n\n1 → x\n2 → x\n3 → y",
      isFunction: true,
      explanation: "Multiple inputs can map to the same output."
    },
    {
      mapping: "A = {1, 2, 3}\nB = {p, q, r}\n\n1 → p\n1 → q\n2 → r",
      isFunction: false,
      explanation: "Input '1' maps to both 'p' and 'q' - not a function!"
    },
    {
      mapping: "A = {a, b, c}\nB = {1, 2, 3, 4}\n\na → 1\nb → 2\nc → 3",
      isFunction: true,
      explanation: "Each input maps to exactly one output."
    },
    {
      mapping: "A = {x, y}\nB = {1, 2, 3}\n\nx → 1\nx → 2\ny → 3",
      isFunction: false,
      explanation: "Input 'x' maps to both '1' and '2' - not allowed!"
    },
    {
      mapping: "Students → Grades\n\nAlex → A\nBob → B\nCharlie → A\nDiana → C",
      isFunction: true,
      explanation: "Each student has one grade (multiple students can have same grade)."
    },
    {
      mapping: "Person → Age\n\nJohn → 25\nJohn → 26\nMary → 30",
      isFunction: false,
      explanation: "John can't have two different ages!"
    },
    {
      mapping: "Country → Capital\n\nUSA → Washington\nFrance → Paris\nIndia → Delhi",
      isFunction: true,
      explanation: "Each country has exactly one capital."
    },
    {
      mapping: "Book → Author\n\nHarry Potter → J.K. Rowling\nHarry Potter → J.R.R. Tolkien",
      isFunction: false,
      explanation: "One book can't have multiple authors in this context."
    },
    {
      mapping: "Input: {1, 4, 9}\nOutput: {1, 2, 3}\n\n1 → 1\n4 → 2\n9 → 3",
      isFunction: true,
      explanation: "This represents f(x) = √x - a valid function."
    }
  ];

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      color: 'white',
      marginBottom: '30px',
      fontSize: '2.5rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    gamesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    gameCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    gameIcon: {
      fontSize: '3rem',
      textAlign: 'center',
      marginBottom: '15px'
    },
    gameTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
      textAlign: 'center'
    },
    gameDescription: {
      color: '#666',
      lineHeight: '1.5',
      textAlign: 'center',
      marginBottom: '15px'
    },
    playBtn: {
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: 'bold',
      width: '100%',
      transition: 'all 0.3s ease'
    },
    modal: {
      display: activeGame ? 'flex' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.8)',
      zIndex: 1000,
      justifyContent: 'center',
      alignItems: 'center'
    },
    gameContent: {
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      maxWidth: '900px',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      margin: '20px'
    },
    closeBtn: {
      position: 'absolute',
      top: '15px',
      right: '20px',
      background: '#ff4757',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '35px',
      height: '35px',
      cursor: 'pointer',
      fontSize: '18px'
    },
    score: {
      textAlign: 'center',
      fontSize: '1.2rem',
      margin: '15px 0',
      color: '#2c5aa0',
      fontWeight: 'bold'
    },
    gameInstructions: {
      background: '#e8f5e8',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '20px',
      borderLeft: '5px solid #4caf50'
    },
    objectsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '10px',
      margin: '20px 0',
      minHeight: '80px',
      padding: '15px',
      border: '2px dashed #ccc',
      borderRadius: '10px',
      background: '#f9f9f9'
    },
    draggableItem: {
      background: '#fff',
      border: '2px solid #4CAF50',
      borderRadius: '10px',
      padding: '10px 15px',
      fontSize: '1.2rem',
      cursor: 'move',
      transition: 'all 0.3s ease',
      userSelect: 'none'
    },
    setContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      gap: '20px',
      margin: '20px 0',
      flexWrap: 'wrap'
    },
    setBox: {
      border: '3px dashed #2196F3',
      borderRadius: '15px',
      padding: '20px',
      minWidth: '200px',
      minHeight: '150px',
      background: 'rgba(33, 150, 243, 0.1)',
      textAlign: 'center',
      position: 'relative'
    },
    setTitle: {
      fontWeight: 'bold',
      fontSize: '1.1rem',
      marginBottom: '10px',
      color: '#2196F3'
    },
    setItems: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '5px',
      justifyContent: 'center',
      minHeight: '60px',
      alignItems: 'center'
    },
    submitBtn: {
      background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      margin: '10px',
      transition: 'all 0.3s ease'
    },
    feedback: {
      padding: '15px',
      borderRadius: '10px',
      margin: '15px 0',
      fontWeight: 'bold'
    },
    feedbackSuccess: {
      background: '#c8e6c9',
      color: '#2e7d32'
    },
    feedbackError: {
      background: '#ffcdd2',
      color: '#c62828'
    },
    vennContainer: {
      position: 'relative',
      width: '400px',
      height: '300px',
      margin: '20px auto',
      border: '2px solid #333',
      borderRadius: '10px',
      background: '#f0f0f0'
    },
    vennCircle: {
      position: 'absolute',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      border: '3px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      opacity: 0.8
    },
    circleA: {
      left: '50px',
      top: '75px',
      background: 'rgba(255, 107, 107, 0.3)',
      borderColor: '#ff6b6b'
    },
    circleB: {
      right: '50px',
      top: '75px',
      background: 'rgba(78, 205, 196, 0.3)',
      borderColor: '#4ecdc4'
    },
    vennItems: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      margin: '20px 0',
      justifyContent: 'center'
    },
    relationContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      margin: '20px 0',
      gap: '20px'
    },
    relationSet: {
      background: '#f5f5f5',
      border: '2px solid #666',
      borderRadius: '10px',
      padding: '20px',
      minWidth: '150px'
    },
    relationItem: {
      background: '#fff',
      border: '2px solid #2196F3',
      borderRadius: '8px',
      padding: '10px',
      margin: '5px 0',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    relationItemSelected: {
      background: '#bbdefb',
      borderColor: '#1976d2'
    },
    functionMachine: {
      background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
      borderRadius: '20px',
      padding: '30px',
      margin: '20px auto',
      maxWidth: '400px',
      color: 'white',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    machineDisplay: {
      background: '#2d3436',
      borderRadius: '10px',
      padding: '15px',
      margin: '15px 0',
      fontFamily: 'Courier New, monospace',
      fontSize: '1.1rem'
    },
    inputOutput: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '15px 0'
    },
    inputField: {
      background: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '1.1rem',
      textAlign: 'center',
      width: '80px',
      color: 'black'
    },
    quizContainer: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    mappingDisplay: {
      background: '#f5f5f5',
      border: '2px solid #333',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px 0',
      fontFamily: 'Courier New, monospace',
      whiteSpace: 'pre-line'
    },
    quizOptions: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      margin: '20px 0'
    },
    quizOption: {
      background: '#f8f9fa',
      border: '2px solid #ddd',
      borderRadius: '10px',
      padding: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    correct: {
      background: '#c8e6c9',
      borderColor: '#4caf50'
    },
    incorrect: {
      background: '#ffcdd2',
      borderColor: '#f44336'
    }
  };

  // Set Sorter Game
  const SetSorterGame = () => {
    const [currentData, setCurrentData] = useState(setSorterData[0]);
    const [feedback, setFeedback] = useState('');
    const [setItems, setSetItems] = useState({});

    const nextSetRound = () => {
      const newRound = (currentSetRound + 1) % setSorterData.length;
      setCurrentSetRound(newRound);
      setCurrentData(setSorterData[newRound]);
      setSetItems({});
      setFeedback('');
    };

    const handleDrop = (e, setName) => {
      e.preventDefault();
      const item = e.dataTransfer.getData('text/plain');
      setSetItems(prev => ({
        ...prev,
        [setName]: [...(prev[setName] || []), item]
      }));
    };

    const handleDragStart = (e, item) => {
      e.dataTransfer.setData('text/plain', item);
    };

    const checkSetSorting = () => {
      let correct = 0;
      let total = 0;
      
      currentData.sets.forEach(set => {
        const placedItems = setItems[set.name] || [];
        set.items.forEach(correctItem => {
          total++;
          if (placedItems.includes(correctItem)) {
            correct++;
          }
        });
      });
      
      const score = Math.round((correct / total) * 100);
      setScores(prev => ({ ...prev, set: prev.set + score }));
      
      if (correct === total) {
        setFeedback('Perfect! All items sorted correctly! 🎉');
      } else {
        setFeedback(`Good try! You got ${correct}/${total} correct.`);
      }
    };

    return (
      <div>
        <div style={styles.gameInstructions}>
          Drag the objects below into their correct sets. Each object belongs to exactly one set!
        </div>
        <div style={styles.score}>Score: {scores.set}</div>
        
        <div style={styles.objectsContainer}>
          {currentData.objects.filter(obj => 
            !Object.values(setItems).flat().includes(obj)
          ).map(obj => (
            <div
              key={obj}
              style={styles.draggableItem}
              draggable
              onDragStart={(e) => handleDragStart(e, obj)}
            >
              {obj}
            </div>
          ))}
        </div>
        
        <div style={styles.setContainer}>
          {currentData.sets.map(set => (
            <div key={set.name} style={styles.setBox}>
              <div style={styles.setTitle}>{set.name}</div>
              <div
                style={styles.setItems}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, set.name)}
              >
                {(setItems[set.name] || []).map(item => (
                  <div key={item} style={{...styles.draggableItem, fontSize: '0.9rem', margin: '2px'}}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <button onClick={nextSetRound} style={styles.submitBtn}>New Round</button>
        <button onClick={checkSetSorting} style={styles.submitBtn}>Check Answers</button>
        {feedback && (
          <div style={{...styles.feedback, ...(feedback.includes('Perfect') ? styles.feedbackSuccess : styles.feedbackError)}}>
            {feedback}
          </div>
        )}
      </div>
    );
  };

  // Venn Diagram Game
  const VennDiagramGame = () => {
    const [currentProblem, setCurrentProblem] = useState(vennProblems[0]);
    const [vennItems, setVennItems] = useState({});
    const [feedback, setFeedback] = useState('');

    const nextVennProblem = () => {
      const newProblem = vennProblems[Math.floor(Math.random() * vennProblems.length)];
      setCurrentProblem(newProblem);
      setVennItems({});
      setFeedback('');
    };

    const handleVennDrop = (e, region) => {
      e.preventDefault();
      const item = e.dataTransfer.getData('text/plain');
      const belongs = e.dataTransfer.getData('belongs');
      setVennItems(prev => ({
        ...prev,
        [item]: { region, belongs }
      }));
    };

    const handleVennDragStart = (e, item) => {
      const itemData = currentProblem.items.find(i => i.name === item);
      e.dataTransfer.setData('text/plain', item);
      e.dataTransfer.setData('belongs', itemData.belongs);
    };

    const checkVennSolution = () => {
      let correct = 0;
      let total = Object.keys(vennItems).length;
      
      Object.entries(vennItems).forEach(([item, data]) => {
        if (data.region === data.belongs) {
          correct++;
        }
      });
      
      setScores(prev => ({ ...prev, venn: prev.venn + correct * 20 }));
      
      if (correct === total && total > 0) {
        setFeedback('Excellent! All items placed correctly! 🎯');
      } else {
        setFeedback(`You got ${correct}/${total} correct. Try again!`);
      }
    };

    return (
      <div>
        <div style={styles.gameInstructions}>
          Drag items to the correct region of the Venn diagram. Items can belong to Set A only, Set B only, or both sets!
        </div>
        <div style={styles.score}>Score: {scores.venn}</div>
        
        <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 0', padding: '0 50px'}}>
          <span>{currentProblem.setA.label}</span>
          <span>{currentProblem.setB.label}</span>
        </div>
        
        <div style={styles.vennContainer}>
          <div 
            style={{...styles.vennCircle, ...styles.circleA}}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleVennDrop(e, 'a')}
          >
            {currentProblem.setA.label}
          </div>
          <div 
            style={{...styles.vennCircle, ...styles.circleB}}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleVennDrop(e, 'b')}
          >
            {currentProblem.setB.label}
          </div>
          <div 
            style={{position: 'absolute', left: '125px', top: '125px', width: '150px', height: '50px'}}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleVennDrop(e, 'both')}
          />
          <div 
            style={{position: 'absolute', left: '10px', top: '10px', width: '80px', height: '50px'}}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleVennDrop(e, 'none')}
          />
          
          {Object.entries(vennItems).map(([item, data]) => (
            <div key={item} style={{
              position: 'absolute',
              left: data.region === 'a' ? '75px' : data.region === 'b' ? '225px' : data.region === 'both' ? '150px' : '20px',
              top: data.region === 'none' ? '20px' : '150px',
              background: data.region === data.belongs ? '#c8e6c9' : '#ffcdd2',
              border: '1px solid #333',
              borderRadius: '5px',
              padding: '2px 5px',
              fontSize: '0.8rem'
            }}>
              {item}
            </div>
          ))}
        </div>
        
        <div style={styles.vennItems}>
          {currentProblem.items.filter(item => !vennItems[item.name]).map(item => (
            <div
              key={item.name}
              style={styles.draggableItem}
              draggable
              onDragStart={(e) => handleVennDragStart(e, item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
        
        <button onClick={nextVennProblem} style={styles.submitBtn}>New Problem</button>
        <button onClick={checkVennSolution} style={styles.submitBtn}>Check Solution</button>
        {feedback && (
          <div style={{...styles.feedback, ...(feedback.includes('Excellent') ? styles.feedbackSuccess : styles.feedbackError)}}>
            {feedback}
          </div>
        )}
      </div>
    );
  };

  // Relation Builder Game
  const RelationBuilderGame = () => {
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
      if (currentRelationProblem && canvasRef.current) {
        drawRelations();
      }
    }, [currentRelations, currentRelationProblem]);

    const nextRelationProblem = () => {
      const problem = relationProblems[Math.floor(Math.random() * relationProblems.length)];
      setCurrentRelationProblem(problem);
      setCurrentRelations([]);
      setSelectedRelationItem(null);
      setFeedback('');
    };

    const selectRelationItem = (item, set) => {
      if (!selectedRelationItem) {
        if (set === 'A') {
          setSelectedRelationItem({ item, set });
        }
      } else {
        if (set === 'B' && selectedRelationItem.set === 'A') {
          const relation = {
            from: selectedRelationItem.item,
            to: item
          };
          setCurrentRelations(prev => [...prev, relation]);
          setSelectedRelationItem(null);
        } else {
          setSelectedRelationItem(set === 'A' ? { item, set } : null);
        }
      }
    };

    const clearRelations = () => {
      setCurrentRelations([]);
      setSelectedRelationItem(null);
    };

    const checkRelations = () => {
      if (!currentRelationProblem) return;
      
      const target = currentRelationProblem.targetRelations;
      let correct = 0;
      
      target.forEach(targetRel => {
        const found = currentRelations.find(rel => 
          rel.from === targetRel.from && rel.to === targetRel.to
        );
        if (found) correct++;
      });
      
      setScores(prev => ({ ...prev, relation: prev.relation + correct * 15 }));
      
      if (correct === target.length) {
        setFeedback('Perfect relations! All connections correct! 🔗');
      } else {
        setFeedback(`You got ${correct}/${target.length} relations correct.`);
      }
    };

    const drawRelations = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#2196f3';
      ctx.lineWidth = 2;
      
      currentRelations.forEach(relation => {
        // Simple line drawing for relations
        ctx.beginPath();
        ctx.moveTo(150, 50);
        ctx.lineTo(350, 50);
        ctx.stroke();
      });
    };

    if (!currentRelationProblem) {
      nextRelationProblem();
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div style={styles.gameInstructions}>
          Click on items from Set A, then click on items from Set B to create relations. Build the correct relationships!
        </div>
        <div style={styles.score}>Score: {scores.relation}</div>
        
        <div style={styles.relationContainer}>
          <div style={styles.relationSet}>
            <h3>{currentRelationProblem.setA.name}</h3>
            {currentRelationProblem.setA.items.map(item => (
              <div
                key={item}
                style={{
                  ...styles.relationItem,
                  ...(selectedRelationItem?.item === item && selectedRelationItem?.set === 'A' ? styles.relationItemSelected : {})
                }}
                onClick={() => selectRelationItem(item, 'A')}
              >
                {item}
              </div>
            ))}
          </div>
          
          <div style={styles.relationSet}>
            <h3>{currentRelationProblem.setB.name}</h3>
            {currentRelationProblem.setB.items.map(item => (
              <div
                key={item}
                style={{
                  ...styles.relationItem,
                  ...(selectedRelationItem?.item === item && selectedRelationItem?.set === 'B' ? styles.relationItemSelected : {})
                }}
                onClick={() => selectRelationItem(item, 'B')}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={300}
          style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1}}
        />
        
        <div style={{margin: '20px 0'}}>
          <strong>Target Relations:</strong>
          {currentRelationProblem.targetRelations.map(rel => (
            <div key={`${rel.from}-${rel.to}`} style={{margin: '5px 0'}}>
              {rel.from} → {rel.to}
            </div>
          ))}
        </div>
        
        <div style={{margin: '20px 0'}}>
          <strong>Your Relations:</strong>
          {currentRelations.map((rel, index) => (
            <div key={index} style={{margin: '5px 0', color: '#2196f3'}}>
              {rel.from} → {rel.to}
            </div>
          ))}
        </div>
        
        <button onClick={nextRelationProblem} style={styles.submitBtn}>New Problem</button>
        <button onClick={clearRelations} style={{...styles.submitBtn, background: '#ff6b6b'}}>Clear All</button>
        <button onClick={checkRelations} style={styles.submitBtn}>Check Relations</button>
        {feedback && (
          <div style={{...styles.feedback, ...(feedback.includes('Perfect') ? styles.feedbackSuccess : styles.feedbackError)}}>
            {feedback}
          </div>
        )}
      </div>
    );
  };

  // Function Machine Game
  const FunctionMachineGame = () => {
    const [feedback, setFeedback] = useState('');

    const nextFunctionProblem = () => {
      const newFunction = functionTypes[Math.floor(Math.random() * functionTypes.length)];
      setCurrentFunction(newFunction);
      setFunctionTests([]);
      setFunctionInput('');
      setFunctionOutput('');
      setFunctionGuess('');
      setFeedback('');
    };

    const testFunction = () => {
      const input = parseFloat(functionInput);
      if (isNaN(input)) return;
      
      const output = currentFunction.func(input);
      setFunctionOutput(output.toString());
      
      setFunctionTests(prev => [...prev, {input, output}]);
      setFunctionInput('');
    };

    const submitFunctionGuess = () => {
      const guess = functionGuess.toLowerCase().replace(/\s/g, '');
      const correct = currentFunction.description.toLowerCase().replace(/\s/g, '');
      
      if (guess === correct || guess === correct.replace('*', '')) {
        setScores(prev => ({ ...prev, function: prev.function + 25 }));
        setFeedback('Correct! You found the function! 🎰✨');
      } else {
        setFeedback(`Not quite! The function was f(x) = ${currentFunction.description}`);
      }
    };

    if (!currentFunction.func) {
      nextFunctionProblem();
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div style={styles.gameInstructions}>
          Enter different inputs to see the outputs. Try to figure out the hidden function rule!
        </div>
        <div style={styles.score}>Score: {scores.function}</div>
        
        <div style={styles.functionMachine}>
          <h3 style={{textAlign: 'center', marginBottom: '15px'}}>🎰 Mystery Function</h3>
          
          <div style={styles.inputOutput}>
            <div>
              <label>Input (x):</label><br/>
              <input 
                type="number" 
                value={functionInput}
                onChange={(e) => setFunctionInput(e.target.value)}
                style={styles.inputField}
                placeholder="?"
              />
            </div>
            <div style={{fontSize: '2rem'}}>→</div>
            <div>
              <label>Output f(x):</label><br/>
              <input 
                type="number" 
                value={functionOutput}
                style={styles.inputField}
                readOnly
              />
            </div>
          </div>
          
          <button onClick={testFunction} style={{...styles.submitBtn, width: '100%'}}>Test Input</button>
          
          <div style={{background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '15px', margin: '15px 0'}}>
            <strong>Previous Tests:</strong>
            <div style={styles.machineDisplay}>
              {functionTests.length > 0 
                ? functionTests.map((test, index) => (
                    <div key={index}>f({test.input}) = {test.output}</div>
                  ))
                : 'Click "Test Input" to see examples...'
              }
            </div>
          </div>
          
          <div style={{marginTop: '15px'}}>
            <label style={{color: 'white'}}>Your guess for f(x) = </label><br/>
            <input 
              type="text" 
              value={functionGuess}
              onChange={(e) => setFunctionGuess(e.target.value)}
              placeholder="e.g., 2x + 1" 
              style={{width: '100%', padding: '8px', borderRadius: '5px', border: 'none', marginTop: '5px', color: 'black'}}
            />
          </div>
        </div>
        
        <button onClick={submitFunctionGuess} style={styles.submitBtn}>Submit Guess</button>
        <button onClick={nextFunctionProblem} style={{...styles.submitBtn, background: '#6c5ce7'}}>New Function</button>
        {feedback && (
          <div style={{...styles.feedback, ...(feedback.includes('Correct') ? styles.feedbackSuccess : styles.feedbackError)}}>
            {feedback}
          </div>
        )}
      </div>
    );
  };

  // Function Quiz Game
  const FunctionQuizGame = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const startQuiz = () => {
      setQuizQuestions(quizQuestionsData);
      setCurrentQuizQuestion(0);
      setScores(prev => ({ ...prev, quiz: 0 }));
      setQuizStarted(true);
      setFeedback('');
      setSelectedAnswer(null);
    };

    const selectQuizAnswer = (isFunction) => {
      if (selectedAnswer !== null) return;
      
      const question = quizQuestions[currentQuizQuestion];
      setSelectedAnswer(isFunction);
      
      if (isFunction === question.isFunction) {
        setScores(prev => ({ ...prev, quiz: prev.quiz + 10 }));
        setFeedback(`Correct! ${question.explanation}`);
      } else {
        setFeedback(`Wrong! ${question.explanation}`);
      }
      
      setTimeout(() => {
        if (currentQuizQuestion + 1 < quizQuestions.length) {
          setCurrentQuizQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setFeedback('');
        } else {
          endQuiz();
        }
      }, 3000);
    };

    const endQuiz = () => {
      setFeedback(`Quiz Complete! 🎉 Final Score: ${scores.quiz}/100 points`);
      setQuizStarted(false);
    };

    if (!quizStarted) {
      return (
        <div>
          <div style={styles.gameInstructions}>
            Look at each mapping and decide: Is it a function or not? Remember: each input must have exactly one output!
          </div>
          <div style={styles.score}>Score: {scores.quiz}</div>
          <div style={styles.quizContainer}>
            <button onClick={startQuiz} style={styles.submitBtn}>Start Quiz</button>
          </div>
        </div>
      );
    }

    const currentQuestion = quizQuestions[currentQuizQuestion];

    return (
      <div>
        <div style={styles.gameInstructions}>
          Look at each mapping and decide: Is it a function or not? Remember: each input must have exactly one output!
        </div>
        <div style={styles.score}>Score: {scores.quiz} | Question: {currentQuizQuestion + 1}/10</div>
        
        <div style={styles.quizContainer}>
          <div style={styles.mappingDisplay}>
            {currentQuestion.mapping}
          </div>
          
          <div style={styles.quizOptions}>
            <div 
              style={{
                ...styles.quizOption,
                ...(selectedAnswer === true ? (currentQuestion.isFunction ? styles.correct : styles.incorrect) : {})
              }}
              onClick={() => selectQuizAnswer(true)}
            >
              ✅ This is a FUNCTION
            </div>
            <div 
              style={{
                ...styles.quizOption,
                ...(selectedAnswer === false ? (!currentQuestion.isFunction ? styles.correct : styles.incorrect) : {}),
                ...(selectedAnswer === true && !currentQuestion.isFunction ? styles.correct : {})
              }}
              onClick={() => selectQuizAnswer(false)}
            >
              ❌ This is NOT a function
            </div>
          </div>
          
          {feedback && (
            <div style={{...styles.feedback, ...(feedback.includes('Correct') ? styles.feedbackSuccess : styles.feedbackError)}}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    );
  };

  const openGame = (gameType) => {
    setActiveGame(gameType);
  };

  const closeGame = () => {
    setActiveGame(null);
  };

  const renderGameContent = () => {
    switch(activeGame) {
      case 'setSorter':
        return <SetSorterGame />;
      case 'vennDiagram':
        return <VennDiagramGame />;
      case 'relationBuilder':
        return <RelationBuilderGame />;
      case 'functionMachine':
        return <FunctionMachineGame />;
      case 'functionQuiz':
        return <FunctionQuizGame />;
      default:
        return null;
    }
  };

  const getGameTitle = () => {
    const titles = {
      setSorter: '🧺 Set Sorter Challenge',
      vennDiagram: '🎯 Venn Diagram Puzzle',
      relationBuilder: '🔗 Relation Builder',
      functionMachine: '🎰 Function Machine',
      functionQuiz: '🤔 Function vs Not-a-Function Quiz'
    };
    return titles[activeGame] || '';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🧮 Sets, Relations & Functions Games 🔗</h1>
      
      <div style={styles.gamesGrid}>
        <div style={styles.gameCard} onClick={() => openGame('setSorter')}>
          <div style={styles.gameIcon}>🧺</div>
          <div style={styles.gameTitle}>Set Sorter Challenge</div>
          <div style={styles.gameDescription}>Drag objects into correct sets to understand set formation and grouping!</div>
          <button style={styles.playBtn}>Play Now</button>
        </div>

        <div style={styles.gameCard} onClick={() => openGame('vennDiagram')}>
          <div style={styles.gameIcon}>🎯</div>
          <div style={styles.gameTitle}>Venn Diagram Puzzle</div>
          <div style={styles.gameDescription}>Place items in the right parts of Venn diagrams to explore intersections and unions!</div>
          <button style={styles.playBtn}>Play Now</button>
        </div>

        <div style={styles.gameCard} onClick={() => openGame('relationBuilder')}>
          <div style={styles.gameIcon}>🔗</div>
          <div style={styles.gameTitle}>Relation Builder</div>
          <div style={styles.gameDescription}>Connect elements between sets to learn about relations and mappings!</div>
          <button style={styles.playBtn}>Play Now</button>
        </div>

        <div style={styles.gameCard} onClick={() => openGame('functionMachine')}>
          <div style={styles.gameIcon}>🎰</div>
          <div style={styles.gameTitle}>Function Machine</div>
          <div style={styles.gameDescription}>Guess the hidden function rule by testing inputs and outputs!</div>
          <button style={styles.playBtn}>Play Now</button>
        </div>

        <div style={styles.gameCard} onClick={() => openGame('functionQuiz')}>
          <div style={styles.gameIcon}>🤔</div>
          <div style={styles.gameTitle}>Function vs Not-a-Function Quiz</div>
          <div style={styles.gameDescription}>Identify whether mappings represent functions or just relations!</div>
          <button style={styles.playBtn}>Play Now</button>
        </div>
      </div>

      {/* Game Modal */}
      <div style={styles.modal}>
        <div style={styles.gameContent}>
          <button style={styles.closeBtn} onClick={closeGame}>&times;</button>
          <h2>{getGameTitle()}</h2>
          {renderGameContent()}
        </div>
      </div>
    </div>
  );
};

export default SetsRelationsFunctionsGames